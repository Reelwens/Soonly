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

class GetAllMemoriesController extends Controller {
	
	/**
	 * @Route("/api/getMemories/{token}")
	 *
	 *
	 * @param string $token
	 *
	 * @return JsonResponse
	 */
	public function getCalendarAction( $token )
	{
		$data["success"] = false;
		$token = $this->getDoctrine()
		              ->getRepository( "ApiBundle:Token")
		              ->findOneBy(["token" => $token]);
		
		if ($token == null)
		{
			$data["error"] = "token.invalid";
		} else {
			$allMemories = $this->getDoctrine()->getRepository( "ApiBundle:Event" )->findAllViewed( $token->getUser() );
			
			/** @var Event $memory */
			foreach ($allMemories as $key => $memory) {
				$attachement = $memory->getAttachement();
				switch (ClassUtils::getClass($attachement))
				{
					case "ApiBundle\\Entity\\MessageAttachement":
						/** @var MessageAttachement $attachement */
						$data["memories"][$key]["type"]    = "message";
						$data["memories"][$key]["message"] = $attachement->getMessage();
						$data["memories"][$key]["theme"]   = $attachement->getTheme();
						break;
					case "ApiBundle\\Entity\\ImageAttachement":
						/** @var ImageAttachement $attachement */
						$data["memories"][$key]["type"]    = "image";
						$data["memories"][$key]["base64"]  = $attachement->getBase64();
						break;
					case "ApiBundle\\Entity\\VideoAttachement":
						/** @var VideoAttachement $attachement */
						$data["memories"][$key]["type"]  = "video";
						$data["memories"][$key]["url"]   = $attachement->getVideo();
						break;
				}
			}
			$data["success"] = true;
		}
		
		return new JsonResponse($data, 200, ["Access-Control-Allow-Origin" => "*"]);
	}
	
}
