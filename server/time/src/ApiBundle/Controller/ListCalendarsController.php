<?php

namespace ApiBundle\Controller;

use ApiBundle\Entity\Calendar;
use ApiBundle\Entity\User;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\JsonResponse;

class ListCalendarsController extends Controller {
	
	
	/**
	 * @Route("/api/listCalendars/{token}")
	 *
	 *
	 * @param string $token
	 *
	 * @return JsonResponse
	 */
	public function listCalendarsAction($token)
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
			
			$calendarsReceiver = $user->getCalendarsReceiver()->getValues();
			foreach ($calendarsReceiver as $key=>$calendar)
			{
				/** @var Calendar $calendar */
				$data["calendarsReceiver"][$key]["id"] = $calendar->getId();
				$data["calendarsReceiver"][$key]["name"] = $calendar->getName();
			}
			
			$calendars = $user->getCalendars()->getValues();
			foreach ($calendars as $key=>$calendar)
			{
				/** @var Calendar $calendar */
				$data["calendars"][$key]["id"] = $calendar->getId();
				$data["calendars"][$key]["name"] = $calendar->getName();
			}
			
			$data["success"] = true;
		}
		
		 return new JsonResponse($data, 200, ["Access-Control-Allow-Origin" => "*"]);
	}
}
