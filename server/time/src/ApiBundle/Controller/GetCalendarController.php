<?php

namespace ApiBundle\Controller;

use ApiBundle\Entity\Calendar;
use ApiBundle\Entity\Event;
use ApiBundle\Entity\User;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\JsonResponse;

class GetCalendarController extends Controller {
	
	
	/**
	 * @Route("/api/getCalendar/{token}/{id}")
	 *
	 *
	 * @param string $token
	 *
	 * @param Calendar $calendar
	 *
	 * @return JsonResponse
	 */
	public function getCalendarAction( $token, Calendar $calendar )
	{
		$data["success"] = false;
		$token = $this->getDoctrine()
		              ->getRepository( "ApiBundle:Token")
		              ->findOneBy(["token" => $token]);
		
		if ($token == null)
		{
			$data["error"] = "token.invalid";
		} else {
			
			/** @var User $user */
			$user = $token->getUser();
			
			if ($calendar->getUser()->getId() !== $user->getId() ) {
				$data["error"] = "user.unauthorized";
			} else {
				$data["calendar"] = (array) $calendar;
				$events = $calendar->getEvents();
				
				$i = 0;
				foreach ($events as $key => $event) {
					/** @var Event $event */
					$data["events"]["id"][] = $event->getId();
				}
			}
			
			foreach ($data["calendar"] as $k => $v) {
				$i = preg_match('/^\x00(?:.*?)\x00(.+)/', $k, $matches) ? $matches[1] : $k;
				$data["calendar"][$i] = $v;
				unset($data["calendar"][$k]);
			}
			$data["success"] = true;
		}
		
		return new JsonResponse($data);
	}
}
