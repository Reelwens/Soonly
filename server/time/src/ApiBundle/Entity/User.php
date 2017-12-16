<?php

namespace ApiBundle\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\ORM\Mapping as ORM;

/**
 * User
 *
 * @ORM\Table(name="user")
 * @ORM\Entity(repositoryClass="ApiBundle\Repository\UserRepository")
 */
class User
{
    /**
     * @var int
     *
     * @ORM\Column(name="id", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    private $id;
	
	/**
	 * @ORM\OneToOne(targetEntity="Token", mappedBy="user")
	 * @ORM\JoinColumn(name="token_id", referencedColumnName="id")
	 */
	private $token;

    /**
     * @var string
     *
     * @ORM\Column(name="number", type="string", length=10, unique=true)
     */
    private $number;
	
	/**
	 * @var string
	 *
	 * @ORM\Column(name="password", type="string", length=255, unique=false, nullable=true)
	 */
	private $password;

    /**
     * @var string
     *
     * @ORM\Column(name="surname", type="string", length=64, nullable=true, unique=false)
     */
    private $surname;
	
	/**
	 * @var ArrayCollection
	 *
	 * @ORM\OneToMany(targetEntity="Calendar", mappedBy="user")
	 */
	private $calendars;
	
	/**
	 * @var ArrayCollection
	 *
	 * @ORM\OneToMany(targetEntity="Calendar", mappedBy="receiver")
	 */
	private $calendars_receiver;

		
	public function __construct() {
		$this->calendars = new ArrayCollection();
		$this->calendars_receiver = new ArrayCollection();
	}
	
	/**
     * Get id
     *
     * @return int
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Set number
     *
     * @param string $number
     *
     * @return User
     */
    public function setNumber($number)
    {
        $this->number = $number;

        return $this;
    }

    /**
     * Get number
     *
     * @return string
     */
    public function getNumber()
    {
        return $this->number;
    }

    /**
     * Set surname
     *
     * @param string $surname
     *
     * @return User
     */
    public function setSurname($surname)
    {
        $this->surname = $surname;

        return $this;
    }

    /**
     * Get surname
     *
     * @return string
     */
    public function getSurname()
    {
        return $this->surname;
    }

    /**
     * Set token
     *
     * @param \ApiBundle\Entity\Token $token
     *
     * @return User
     */
    public function setToken(\ApiBundle\Entity\Token $token = null)
    {
        $this->token = $token;

        return $this;
    }

    /**
     * Get token
     *
     * @return \ApiBundle\Entity\Token
     */
    public function getToken()
    {
        return $this->token;
    }

    /**
     * Add calendar
     *
     * @param \ApiBundle\Entity\Calendar $calendar
     *
     * @return User
     */
    public function addCalendar(\ApiBundle\Entity\Calendar $calendar)
    {
        $this->calendars[] = $calendar;

        return $this;
    }

    /**
     * Remove calendar
     *
     * @param \ApiBundle\Entity\Calendar $calendar
     */
    public function removeCalendar(\ApiBundle\Entity\Calendar $calendar)
    {
        $this->calendars->removeElement($calendar);
    }

    /**
     * Get calendars
     *
     * @return \Doctrine\Common\Collections\Collection
     */
    public function getCalendars()
    {
        return $this->calendars;
    }

    /**
     * Set password
     *
     * @param string $password
     *
     * @return User
     */
    public function setPassword($password)
    {
        $this->password = $password;

        return $this;
    }

    /**
     * Get password
     *
     * @return string
     */
    public function getPassword()
    {
        return $this->password;
    }

    /**
     * Add calendarsReceiver
     *
     * @param \ApiBundle\Entity\Calendar $calendarsReceiver
     *
     * @return User
     */
    public function addCalendarsReceiver(\ApiBundle\Entity\Calendar $calendarsReceiver)
    {
        $this->calendars_receiver[] = $calendarsReceiver;

        return $this;
    }

    /**
     * Remove calendarsReceiver
     *
     * @param \ApiBundle\Entity\Calendar $calendarsReceiver
     */
    public function removeCalendarsReceiver(\ApiBundle\Entity\Calendar $calendarsReceiver)
    {
        $this->calendars_receiver->removeElement($calendarsReceiver);
    }

    /**
     * Get calendarsReceiver
     *
     * @return \Doctrine\Common\Collections\Collection
     */
    public function getCalendarsReceiver()
    {
        return $this->calendars_receiver;
    }
}
