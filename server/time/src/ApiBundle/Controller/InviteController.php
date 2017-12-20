<?php

namespace ApiBundle\Controller;

use ApiBundle\Entity\User;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\JsonResponse;

class InviteController extends Controller {
	
	
	/**
	 * @Route("/api/inviteUser/{phone}/{token}")
	 * @param $phone
	 * @param $token
	 *
	 * @return JsonResponse
	 */
	public function inviteUserAction($phone, $token)
	{
		$data["success"] = false;
		$checkToken = $this->getDoctrine()->getRepository("ApiBundle:Token")->findByToken($token);
		$checkuser = $this->getDoctrine()->getRepository("ApiBundle:User")->findByNumber($phone);
		if ($checkToken === []) {
			//Well self-explained error...
			$data["error"] = "token.invalid";
			
		} else if ( $checkuser !== []) {
			// Actually the user exists as an invited one, now we register it
			$data["user"] = (array)($checkuser[0]);
			foreach ($data["user"] as $k => $v) {
				$i = preg_match('/^\x00(?:.*?)\x00(.+)/', $k, $matches) ? $matches[1] : $k;
				$data["user"][$i] = $v;
				unset($data["user"][$k]);
			}
			$data["success"] = true;
		} else {
			// This is a completly new user
			$user = new User();
			$user->setNumber($phone);
			
			$em = $this->getDoctrine()->getManager();
			$em->persist($user);
			$em->flush();
			
			$data["success"] = true;
			$data["user"] = (array) $user;
			
			foreach ($data["user"] as $k => $v) {
				$i = preg_match('/^\x00(?:.*?)\x00(.+)/', $k, $matches) ? $matches[1] : $k;
				$data["user"][$i] = $v;
				unset($data["user"][$k]);
			}
		}
		
		 return new JsonResponse($data, 200, ["Access-Control-Allow-Origin" => "*"]);
	}
}
