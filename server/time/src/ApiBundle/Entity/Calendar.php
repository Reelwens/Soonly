<?php

namespace ApiBundle\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\ORM\Mapping as ORM;

/**
 * Calendar
 *
 * @ORM\Table(name="calendar")
 * @ORM\Entity(repositoryClass="ApiBundle\Repository\CalendarRepository")
 */
class Calendar
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
	 *
	 * @ORM\ManyToOne(targetEntity="User", inversedBy="calendars")
	 * @ORM\JoinColumn(name="user_id", referencedColumnName="id")
	 */
	private $user;

    /**
     * @var \DateTime
     *
     * @ORM\Column(name="creationDate", type="date")
     */
    private $creationDate;

    /**
     * @var \DateTime
     *
     * @ORM\Column(name="endDate", type="date")
     */
    private $endDate;

    /**
     * @var int
     *
     * @ORM\Column(name="numberOfEvents", type="integer")
     */
    private $numberOfEvents;
	
	/**
	 * @var string
	 *
	 * @ORM\Column(name="name", type="string", length=128, unique=false)
	 */
	private $name;
	
	/**
	 * @var ArrayCollection
	 *
	 * @ORM\OneToMany(targetEntity="Event", mappedBy="calendar")
	 */
	private $events;
	
	/**
	 * Many Features have One Product.
	 * @ORM\ManyToOne(targetEntity="User", inversedBy="calendarsReceiver")
	 * @ORM\JoinColumn(name="receiver_id", referencedColumnName="id")
	 */
	private $receiver;


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
     * Set creationDate
     *
     * @param \DateTime $creationDate
     *
     * @return Calendar
     */
    public function setCreationDate($creationDate)
    {
        $this->creationDate = $creationDate;

        return $this;
    }

    /**
     * Get creationDate
     *
     * @return \DateTime
     */
    public function getCreationDate()
    {
        return $this->creationDate;
    }

    /**
     * Set endDate
     *
     * @param \DateTime $endDate
     *
     * @return Calendar
     */
    public function setEndDate($endDate)
    {
        $this->endDate = $endDate;

        return $this;
    }

    /**
     * Get endDate
     *
     * @return \DateTime
     */
    public function getEndDate()
    {
        return $this->endDate;
    }

    /**
     * Set numberOfEvents
     *
     * @param integer $numberOfEvents
     *
     * @return Calendar
     */
    public function setNumberOfEvents($numberOfEvents)
    {
        $this->numberOfEvents = $numberOfEvents;

        return $this;
    }

    /**
     * Get numberOfEvents
     *
     * @return int
     */
    public function getNumberOfEvents()
    {
        return $this->numberOfEvents;
    }
    /**
     * Constructor
     */
    public function __construct()
    {
        $this->events = new ArrayCollection();
    }

    /**
     * Set user
     *
     * @param \ApiBundle\Entity\User $user
     *
     * @return Calendar
     */
    public function setUser(\ApiBundle\Entity\User $user = null)
    {
        $this->user = $user;

        return $this;
    }

    /**
     * Get user
     *
     * @return \ApiBundle\Entity\User
     */
    public function getUser()
    {
        return $this->user;
    }

    /**
     * Add event
     *
     * @param \ApiBundle\Entity\Event $event
     *
     * @return Calendar
     */
    public function addEvent(\ApiBundle\Entity\Event $event)
    {
        $this->events[] = $event;

        return $this;
    }

    /**
     * Remove event
     *
     * @param \ApiBundle\Entity\Event $event
     */
    public function removeEvent(\ApiBundle\Entity\Event $event)
    {
        $this->events->removeElement($event);
    }

    /**
     * Get events
     *
     * @return \Doctrine\Common\Collections\Collection
     */
    public function getEvents()
    {
        return $this->events;
    }

    /**
     * Set name
     *
     * @param string $name
     *
     * @return Calendar
     */
    public function setName($name)
    {
        $this->name = $name;

        return $this;
    }

    /**
     * Get name
     *
     * @return string
     */
    public function getName()
    {
        return $this->name;
    }

    /**
     * Set receiver
     *
     * @param \ApiBundle\Entity\User $receiver
     *
     * @return Calendar
     */
    public function setReceiver(\ApiBundle\Entity\User $receiver = null)
    {
        $this->receiver = $receiver;

        return $this;
    }

    /**
     * Get receiver
     *
     * @return \ApiBundle\Entity\User
     */
    public function getReceiver()
    {
        return $this->receiver;
    }
}
