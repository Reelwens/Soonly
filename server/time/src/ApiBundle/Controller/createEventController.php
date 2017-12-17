<?php

namespace ApiBundle\Controller;

use ApiBundle\Entity\Attachement;
use ApiBundle\Entity\Calendar;
use ApiBundle\Entity\Event;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\JsonResponse;

class createEventController extends Controller {
	
	
	/**
	 * @Route("/api/setEvent/{token}/{id}/{eventDate}/{eventNumber}/{id_attachement}")
	 *
	 *
	 * @param string $token
	 * @param Calendar $calendar
	 * @param string $eventDate
	 * @param integer $eventNumber
	 * @param Attachement $attachement
	 *
	 * @return JsonResponse
	 */
	public function setEventAction($token, Calendar $calendar, $eventDate, $eventNumber, Attachement $attachement)
	{
		$data["success"] = false;
		$token = $this->getDoctrine()
		              ->getRepository( "ApiBundle:Token")
		              ->findOneBy(["token" => $token]);
		
		if ($token == null)
		{
			$data["error"] = "token.invalid";
		} else {
			
			if ($calendar->getUser() == $token->getUser()) {
				
				$event = $this->getDoctrine()->getRepository("ApiBundle:Event")
				                    ->findOneBy([
				                    	"calendar"      => $calendar,
					                    "eventNumber"   => $eventNumber
				                    ]);
				if ( $event === null ) {
					$event = new Event();
				}
				$event->setCalendar( $calendar );
				$event->setDate( (new \DateTime())->setTimestamp(intval($eventDate)) );
				$event->setEventNumber( $eventNumber );
				$event->setAttachement( $attachement );
				$data["event"] = (array) $event;
				$attach = (array)$event->getAttachement();
				foreach ($data["event"] as $k => $v) {
					$i = preg_match('/^\x00(?:.*?)\x00(.+)/', $k, $matches) ? $matches[1] : $k;
					$data["event"][$i] = $v;
					unset($data["event"][$k]);
				}
				
				foreach ($attach as $k => $v) {
					$i = preg_match('/^\x00(?:.*?)\x00(.+)/', $k, $matches) ? $matches[1] : $k;
					$attach[$i] = $v;
					unset($attach[$k]);
				}
				$data["event"]["attachement"] = $attach;
				
				
				$data["success"] = true;
			} else {
				$data["error"] = "user.invalid";
			}
			
			
		}
		
		return new JsonResponse($data);
	}
}
