<?php

namespace ApiBundle\Controller;

use ApiBundle\Entity\Calendar;
use ApiBundle\Entity\User;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\JsonResponse;

class listCalendarsController extends Controller {
	
	
	/**
	 * @Route("/api/listCalendars/{token}")
	 *
	 *
	 * @param string $token
	 *
	 * @return JsonResponse
	 */
	public function createCalendarAction($token)
	{
		$data["success"] = false;
		$data["calendarsReceived"] = [];
		$data["calendarsOwned"] = [];
		$token = $this->getDoctrine()
		              ->getRepository( "ApiBundle:Token")
		              ->findOneBy(["token" => $token]);
		
		if ($token == null)
		{
			$data["error"] = "token.invalid";
		} else {
			
			/** @var User $user */
			$user = $token->getUser();
			
			$calendarsOwned = $user->getCalendars();
			
			/** @var Calendar $calendar */
			foreach ($calendarsOwned as $key => $calendar) {
				$data["calendarsOwned"][$calendar->getId()] = ["name" => $calendar->getName()];
			}
			
			$calendarsReceived = $user->getCalendarsReceiver();
			
			/** @var Calendar $calendar */
			foreach ($calendarsReceived as $key => $calendar) {
				$data["calendarsReceived"][$calendar->getId()] = ["name" => $calendar->getName()];
			}
		}
		
		return new JsonResponse($data);
	}
}
