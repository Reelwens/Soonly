<?php

namespace ApiBundle\Controller;

use ApiBundle\Entity\Calendar;
use ApiBundle\Entity\Token;
use ApiBundle\Entity\User;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Component\HttpFoundation\JsonResponse;

class DefaultController extends Controller
{
	/**
	 * @Route("/api/getUser/{param}")
	 * @param mixed $param
	 *
	 * @return JsonResponse
	 */
    public function getUserAction($param)
    {
    	$data["success"] = false;
	    $data["exists"] = false;
    	$user = $this->getDoctrine()->getRepository( "ApiBundle:User")->findOneBy( ["number" => $param] );
		
    	if ($user != null) {
    		$data["exists"] = true;
    		$data["success"] = true;
	    } else {
		    $user = $this->getDoctrine()->getRepository( "ApiBundle:User")->findOneBy( ["id" => $param] );
		    if ($user != null) {
			    $data["exists"] = true;
			    $data["success"] = true;
		    } else {
			    $token = $this->getDoctrine()->getRepository( "ApiBundle:Token" )->findOneBy( [ "token" => $param ] );
			    if ( $token != null ) {
				    /** @var User $user */
				    $user         = $token->getUser();
				    $data["user"] = (array) $user;
				    foreach ( $data["user"] as $k => $v ) {
					    // We remove the class path in keys
					    $i                  = preg_match( '/^\x00(?:.*?)\x00(.+)/', $k, $matches ) ? $matches[1] : $k;
					    $data["user"][ $i ] = $v;
					    unset( $data["user"][ $k ] );
				    }
				    $data["user"]["token"] = $token->getToken();
				    unset( $data["user"]["password"] );
				    $data["success"] = true;
				    $data["exists"]  = true;
			    }
		    }
	    }
	    return new JsonResponse($data);
    }
	
	/**
	 * @Route("/api/authenticateUser/{number}/{passwordHashed}")
	 * @param string $number
	 * @param string $passwordHashed
	 *
	 * @return JsonResponse
	 */
	public function authenticateAction($number, $passwordHashed)
	{
		$data["success"] = false;
		/** @var User $user */
		$user = $this->getDoctrine()->getRepository( "ApiBundle:User" )
		                            ->findOneBy([
		                    	        "number"    => $number,
			                            "password"  => $passwordHashed
		                            ]);
		
		if ($user !== null) {
			if ($user->getToken() !== null ) {
				$data["success"] = true;
				$data["user"] = (array) $user;
				
				foreach ($data["user"] as $k => $v) {
					$i = preg_match('/^\x00(?:.*?)\x00(.+)/', $k, $matches) ? $matches[1] : $k;
					$data["user"][$i] = $v;
					unset($data["user"][$k]);
					
				}
				
				$data["user"]["token"] = ($user->getToken())->getToken();
			} else {
				$em = $this->getDoctrine()->getManager();
				$token = new Token();
				$token->setToken( hash("sha256", uniqid() . $user->getSurname() . $user->getPassword()));
				$token->setUser( $user );
				$em->persist( $token );
				$em->flush();
				
				$user->setToken( $token );
				$em->persist( $user );
				$em->flush();
				
				$data["success"] = true;
				$data["user"] = (array) $user;
				
				foreach ($data["user"] as $k => $v) {
					$i = preg_match('/^\x00(?:.*?)\x00(.+)/', $k, $matches) ? $matches[1] : $k;
					$data["user"][$i] = $v;
					unset($data["user"][$k]);
					
				}
				
				
				$data["user"]["token"] = ($user->getToken())->getToken();
			}
		}
		
		return new JsonResponse($data);
	}
	
	
	
	
}
