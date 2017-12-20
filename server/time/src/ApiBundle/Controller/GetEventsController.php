<?php

namespace ApiBundle\Controller;

use ApiBundle\Entity\Calendar;
use ApiBundle\Entity\Event;
use ApiBundle\Entity\User;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use function Sodium\compare;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Validator\Constraints\DateTime;

class GetEventsController extends Controller {
	
	
	/**
	 * @Route("/api/getEvents/{token}")
	 * @param $token
	 *
	 * @return JsonResponse
	 */
	public function getAttachementAction( $token ) {
		$data["success"] = false;
		
		/** @var User $user */
		$user = $this->getDoctrine()
		             ->getRepository( "ApiBundle:Token")
		             ->findOneBy(["token" => $token] )
		             ->getUser();
		
		if ($user === null) {
			$data["error"] = "token.invalid";
		} else {
			
			
			
			/** @var Calendar $calendar */
			foreach ($user->getCalendars()->getValues() as $key => $calendar) {
				
				/** @var \DatePeriod $dateRange */
				$dateRange     = new \DatePeriod(
					$calendar->getCreationDate(),
					new \DateInterval("P1D"),
					$calendar->getEndDate()->modify("+1 day")
				);
				/** @var Event $event */
				/** @var \DateTime $date */
				foreach ( $dateRange as $key2 => $date ){
					/** @var Event $event */
					$event = $this->getDoctrine()->getRepository("ApiBundle:Event")->findOneBy([ "date" => $date]);
					
					if ($event === null ) {
						$data["calendars"][$calendar->getId()][$key2]["id"] = -1;
						$data["calendars"][$calendar->getId()][$key2]["dayLeft"]        = $date->diff($calendar->getEndDate())->days - 1 === 0 ? "J" : $date->diff($calendar->getEndDate())->days - 1;
						$data["calendars"][$calendar->getId()][$key2]["dayNumber"]      = $date->diff($calendar->getCreationDate())->days + 1 ;
						$data["calendars"][$calendar->getId()][$key2]["discover"]       = false;
					} else {
						$data["calendars"][$calendar->getId()][$key2]["id"]             = $event->getId();
						$data["calendars"][$calendar->getId()][$key2]["attachement"]    = $event->getAttachement() === null ? -1 : $event->getAttachement()->getId();
						$data["calendars"][$calendar->getId()][$key2]["viewed"]         = $event->getViewed();
						$data["calendars"][$calendar->getId()][$key2]["dayLeft"]        = $date->diff($calendar->getEndDate())->days - 1;
						$data["calendars"][$calendar->getId()][$key2]["dayNumber"]      = $date->diff($calendar->getCreationDate())->days + 1 ;
						$data["calendars"][$calendar->getId()][$key2]["discover"]       = $date == $event->getDate();
						$data["calendars"][$calendar->getId()][$key2]["toBeSeen"]       = (new \DateTime("now") < $event->getDate());
						
						if ($event->getDate() > new \DateTime("now")) {
							$data["calendars"][$calendar->getId()][$key2]["openable"]   = false;
						} else {
							$data["calendars"][$calendar->getId()][$key2]["openable"]   = true;
						}
						
					}
				
				}
			}
			
			/** @var Calendar $calendar */
			foreach ($user->getCalendarsReceiver()->getValues() as $key => $calendar) {
				
				/** @var \DatePeriod $dateRange */
				$dateRange     = new \DatePeriod(
					$calendar->getCreationDate(),
					new \DateInterval("P1D"),
					$calendar->getEndDate()->modify("+1 day")
				);
				/** @var Event $event */
				/** @var \DateTime $date */
				foreach ( $dateRange as $key2 => $date ){
					/** @var Event $event */
					$event = $this->getDoctrine()->getRepository("ApiBundle:Event")->findOneBy([ "date" => $date]);
					
					if ($event === null ) {
						$data["calendarsReceiver"][$calendar->getId()][$key2]["id"] = -1;
					} else {
						$data["calendarsReceiver"][$calendar->getId()][$key2]["id"]             = $event->getId();
						$data["calendarsReceiver"][$calendar->getId()][$key2]["attachement"]    = $event->getAttachement() === null ? -1 : $event->getAttachement()->getId();
						$data["calendarsReceiver"][$calendar->getId()][$key2]["viewed"]         = $event->getViewed();
						$data["calendarsReceiver"][$calendar->getId()][$key2]["dayLeft"]        = $event->getDate()->diff($calendar->getEndDate())->days;
						$data["calendarsReceiver"][$calendar->getId()][$key2]["dayNumber"]      = $event->getDate()->diff($calendar->getCreationDate())->days + 1 ;
						
						if ($event->getDate() > new \DateTime("now")) {
							$data["calendarsReceiver"][$calendar->getId()][$key2]["openable"]   = false;
						} else {
							$data["calendarsReceiver"][$calendar->getId()][$key2]["openable"]   = true;
						}
					}
				}
			}
		}
		
		return new JsonResponse( $data, 200, [ "Access-Control-Allow-Origin" => "*" ] );
	}
}