<?php

namespace ApiBundle\Controller;

use ApiBundle\Entity\VideoAttachement;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\File\File;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;

class CreateVideoAttachementController extends Controller {
	
	
	/**
	 * @Route("/api/createVideoAttachement/{token}")
	 *
	 * @param string $token
	 *
	 * @return JsonResponse
	 */
	public function createImageAttachementAction($token)
	{
		$request = Request::createFromGlobals();
		$storePath = $path = $this->get('kernel')->getRootDir() . '/../web';
		
		$data["success"] = false;
		$token = $this->getDoctrine()
		              ->getRepository( "ApiBundle:Token" )
		              ->findOneBy(["token" => $token]);
		
		if ($token == null)
		{
			$data["error"] = "token.invalid";
		} else {
			if ( !isset( $_FILES["video"]) ) {
				$data["success"] = false;
				$data["error"] = "no.video";
			} else {
				/** @var File $file */
				$file = $request->files->get("video");
				
				// Generate a unique name for the file before saving it
				$fileName = md5(uniqid()) . "." . $file->guessExtension();
				
				// Move the file to the directory where video are stored
				$videoDir = $this->container->getParameter('kernel.root_dir').'/../web/uploads/videos';
				
				$file->move($videoDir, $fileName);
				
				$video = new VideoAttachement();
				$video->setVideo( $fileName );
				
				$em = $this->getDoctrine()->getManager();
				$em->persist( $video );
				$em->flush();
				
				$data["video"] = [
					"id"    => $video->getId(),
					"name"  => $video->getVideo(),
					"path"  => $request->getScheme() . '://' . $request->getHttpHost() . $request->getBasePath() . "/videos/"
				];
				
				$data["success"] = true;
			}
		}
		return new JsonResponse($data);
	}
}
