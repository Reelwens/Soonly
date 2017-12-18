<?php

namespace ApiBundle\Controller;

use ApiBundle\Entity\ImageAttachement;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\JsonResponse;

class CreateImageAttachementController extends Controller {
	
	
	/**
	 * @Route("/api/createImageAttachement/{token}")
	 *
	 * @param string $token
	 *
	 * @return JsonResponse
	 */
	public function createImageAttachementAction( $token )
	{
		$data["success"] = false;
		$token = $this->getDoctrine()
		              ->getRepository( "ApiBundle:Token" )
		              ->findOneBy(["token" => $token]);
		
		if ($token == null)
		{
			$data["error"] = "token.invalid";
		} else {
			if ( !isset( $_POST["image"]) ) {
				$data["success"] = false;
				$data["error"] = "no.image";
			} else {
				$image = new ImageAttachement();
				$image->setBase64( $_POST["image"] );
				
				$em = $this->getDoctrine()->getManager();
				$em->persist( $image );
				$em->flush();
				
				$data["success"] = true;
				$data["image"]["id"] = $image->getId();
			}
		}
		return new JsonResponse($data);
	}
}
