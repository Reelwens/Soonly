<?php

namespace ApiBundle\Controller;

use ApiBundle\Entity\Calendar;
use ApiBundle\Entity\MessageAttachement;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\JsonResponse;

class CreateMessageAttachementController extends Controller {
	
	
	/**
	 * @Route("/api/createMessageAttachement/{token}/{theme}/{messageText}")
	 *
	 *
	 * @param string $token
	 * @param $theme
	 * @param $messageText
	 *
	 * @return JsonResponse
	 */
	public function createMessageAttachementAction($token, $theme, $messageText)
	{
		$data["success"] = false;
		$token = $this->getDoctrine()
		              ->getRepository( "ApiBundle:Token")
		              ->findOneBy(["token" => $token]);
		
		if ($token == null)
		{
			$data["error"] = "token.invalid";
		} else {
			$message = new MessageAttachement();
			$message->setMessage( $messageText );
			$message->setTheme( $theme );
			
			$data["message"] = (array) $message;
			
			$em = $this->getDoctrine()->getManager();
			$em->persist( $message );
			$em->flush();
			
			
			foreach ($data["message"] as $k => $v) {
				// We remove the class path in keys
				$i = preg_match('/^\x00(?:.*?)\x00(.+)/', $k, $matches) ? $matches[1] : $k;
				$data["message"][$i] = $v;
				unset($data["message"][$k]);
			}
			$data["message"]["id"] = $message->getId();
			$data["success"] = true;
			
		}
		
		
		 return new JsonResponse($data, 200, ["Access-Control-Allow-Origin" => "*"]);
	}
}
