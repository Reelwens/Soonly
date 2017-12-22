<?php

namespace ApiBundle\Controller;

use ApiBundle\Entity\Event;
use ApiBundle\Entity\ImageAttachement;
use ApiBundle\Entity\MessageAttachement;
use ApiBundle\Entity\VideoAttachement;
use Doctrine\Common\Util\ClassUtils;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\JsonResponse;

class getAttachementController extends Controller {
	
	
	/**
	 * @Route("/api/getAttachement/{token}/{id}")
	 * @param $token
	 * @param Event $event
	 *
	 * @return JsonResponse
	 */
	public function getAttachementAction($token, Event $event)
	{
		$data["success"] = false;
		$data["exists"] = false;
		
		$user = $this->getDoctrine()->getRepository( "ApiBundle:Token" )->findOneBy(["token" => $token])->getUser();
		
		if ( $user === null ) {
			$data["error"] = "user.invalid";
		} else {
			$attachement = $event->getAttachement();
			
			$data["attachement"] = [
				"type_raw"  => ClassUtils::getClass($attachement),
				"id"        => $attachement->getId()
			];
			
			switch (ClassUtils::getClass($attachement))
			{
				case "ApiBundle\\Entity\\MessageAttachement":
					/** @var MessageAttachement $attachement */
					$data["attachement"]["type"]    = "message";
					$data["attachement"]["message"] = $attachement->getMessage();
					$data["attachement"]["theme"]   = $attachement->getTheme();
					break;
				case "ApiBundle\\Entity\\ImageAttachement":
					/** @var ImageAttachement $attachement */
					$data["attachement"]["type"]    = "image";
					$data["attachement"]["base64"] = $attachement->getBase64();
					break;
				case "ApiBundle\\Entity\\VideoAttachement":
					/** @var VideoAttachement $attachement */
					$data["attachement"]["type"]    = "video";
					$data["attachement"]["url"] = $attachement->getVideo();
					break;
					
			}
			
			$event->setViewed(true);
			$em = $this->getDoctrine()->getManager();
			$em->persist($event);
			$em->flush();
			
			$data["success"] = true;
			$data["exists"] = true;
		}
		
		 return new JsonResponse($data, 200, ["Access-Control-Allow-Origin" => "*"]);
	}
}
