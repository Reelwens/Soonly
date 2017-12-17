<?php

namespace ApiBundle\Controller;

use ApiBundle\Entity\Token;
use ApiBundle\Entity\User;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\JsonResponse;

class CreateUserController extends Controller {
	
	/**
	 * @Route("/api/createUser/{phone}/{surname}/{passwordHashed}")
	 * @param string $phone
	 * @param string $surname
	 * @param string $passwordHashed
	 *
	 * @return JsonResponse
	 */
	public function createUserAction($phone, $surname, $passwordHashed)
	{
		$data["success"] = false;
		
		
		$checkuser = $this->getDoctrine()
		                  ->getRepository("ApiBundle:User")
		                  ->findOneBy(["number" => $phone]);
		
		if ( $checkuser !== null ) {
			if ($checkuser->getSurname() !== "" ) {
				$data["error"] = "user.exists";
			} else {
				// The user has been invited !
				$em = $this->getDoctrine()->getManager();
				
				/** @var User $user */
				$user = $checkuser;
				$user->setSurname( $surname )
				     ->setPassword( $passwordHashed );
				
				$em->persist( $user );
				$em->flush();
				
				$token = new Token();
				$token->setToken( hash("sha256", uniqid() . $user->getSurname() . $user->getPassword()));
				$token->setUser( $user );
				$em->persist( $token );
				$em->flush();
				
				$user->setToken( $token );
				$em->persist( $user );
				$em->flush();
				
				$data["success"] = true;
			}
		} else {
			// The User is a new one
			$em = $this->getDoctrine()->getManager();
			
			$user = new User();
			$user->setSurname( $surname )
				->setPassword( $passwordHashed )
				->setNumber( $phone );
			
			$em->persist( $user );
			$em->flush();
			
			$token = new Token();
			$token->setToken( hash("sha256", uniqid() . $user->getSurname() . $user->getPassword()));
			$token->setUser( $user );
			$em->persist( $token );
			$em->flush();
			
			$user->setToken( $token );
			$em->persist( $user );
			$em->flush();
			
			$data["success"] = true;
		}
		
		if ( !isset( $data["error"]) && isset($user) && isset($token)) {
			$data["user"] = (array) $user;
			foreach ($data["user"] as $k => $v) {
				// We remove the class path in keys
				$i = preg_match('/^\x00(?:.*?)\x00(.+)/', $k, $matches) ? $matches[1] : $k;
				$data["user"][$i] = $v;
				unset($data["user"][$k]);
			}
			$data["user"]["token"] = $token->getToken();
			unset($data["user"]["password"]);
		}
		
		return new JsonResponse($data);
	}
	
}
