<?php

namespace ApiBundle\Controller;

use ApiBundle\Entity\Calendar;
use ApiBundle\Entity\Token;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\JsonResponse;

class createCalendarController extends Controller {
	
	
	/**
	 * @Route("/api/createCalendar/{token}/{calendarName}/{phoneReceiver}/{timeStart}/{timeEnd}")
	 *
	 *
	 * @param string $token
	 * @param string $calendarName
	 * @param string $phoneReceiver
	 * @param mixed $timeStart
	 * @param integer $timeEnd
	 *
	 * @return JsonResponse
	 */
	public function createCalendarAction($token, $calendarName, $phoneReceiver, $timeStart, $timeEnd)
	{
		$data["success"] = false;
		$token = $this->getDoctrine()
			->getRepository( "ApiBundle:Token")
			->findOneBy(["token" => $token]);

		if ($token == null)
		{
			$data["error"] = "token.invalid";
		} else {
			
			$receiver = $this->getDoctrine()
			                 ->getRepository( "ApiBundle:User")
			                 ->findOneBy(["number" => $phoneReceiver]);
			
			if ( $receiver == null ) {
				$data["error"] = "receiver.not.exists";
			} else {
				$calendar = new Calendar();
				$calendar->setName( $calendarName );
				$calendar->setUser( $token->getUser() );
				$calendar->setReceiver( $receiver );
				
				if ($timeStart == "now" || intval($timeStart) == 0)
				{
					$calendar->setCreationDate( new \DateTime("now") );
				} else {
					$calendar->setCreationDate( (new \DateTime())->setTimestamp(intval($timeStart)) );
				}
				$calendar->setEndDate( (new \DateTime())->setTimestamp(intval($timeEnd)));
				$calendar->setNumberOfEvents( 0 );
				
				$em = $this->getDoctrine()->getManager();
				$em->persist( $calendar );
				$em->flush();
				
				
				
				$data["calendar"] = (array) $calendar;
				foreach ($data["calendar"] as $k => $v) {
					$i = preg_match('/^\x00(?:.*?)\x00(.+)/', $k, $matches) ? $matches[1] : $k;
					$data["calendar"][$i] = $v;
					unset($data["calendar"][$k]);
				}
				
				$data["success"] = true;
				
				
			}
		}
		
		
		return new JsonResponse($data);
	}
}
