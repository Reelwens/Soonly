<?php

namespace ApiBundle\Controller;

use ApiBundle\Entity\Calendar;
use ApiBundle\Entity\Token;
use ApiBundle\Entity\User;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\JsonResponse;

class CreateCalendarController extends Controller {
	
	
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
			
			/** @var User $receiver */
			$receiver = $this->getDoctrine()
			                 ->getRepository( "ApiBundle:User")
			                 ->findOneBy(["number" => $phoneReceiver]);
			
			if ( $receiver == null ) {
				//We create an empty user to invite him !
				$receiver = new User();
				$receiver->setNumber($phoneReceiver);
				$em = $this->getDoctrine()->getManager();
				$em->persist( $receiver );
				$em->flush();
				
			}
			$calendar = new Calendar();
			$calendar->setName( $calendarName );
			$calendar->setUser( $token->getUser() );
			$calendar->setReceiver( $receiver );
			
			if ($timeStart == "now")
			{
				$calendar->setCreationDate( new \DateTime( "now") );
			} else {
				$calendar->setCreationDate( new \DateTime($timeStart) );
			}
			$calendar->setEndDate( (new \DateTime($timeEnd)) );
			$calendar->setNumberOfEvents( 0 );
			
			$em = $this->getDoctrine()->getManager();
			$em->persist( $calendar );
			$em->flush();
			
			$data["success"] = true;
		}
		
		
		return new JsonResponse($data, 200, ["Access-Control-Allow-Origin" => "*"]);
	}
}
