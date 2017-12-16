<?php

namespace ApiBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Event
 *
 * @ORM\Table(name="event")
 * @ORM\Entity(repositoryClass="ApiBundle\Repository\EventRepository")
 */
class Event
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
     * @var \DateTime
     *
     * @ORM\Column(name="date", type="date")
     */
    private $date;

    /**
     * @var int
     *
     * @ORM\Column(name="eventNumber", type="integer")
     */
    private $eventNumber;
	
	/**
	 *
	 * @ORM\ManyToOne(targetEntity="Calendar", inversedBy="events")
	 * @ORM\JoinColumn(name="calendar_id", referencedColumnName="id")
	 */
	private $calendar;


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
     * Set date
     *
     * @param \DateTime $date
     *
     * @return Event
     */
    public function setDate($date)
    {
        $this->date = $date;

        return $this;
    }
    
    

    /**
     * Get date
     *
     * @return \DateTime
     */
    public function getDate()
    {
        return $this->date;
    }

    /**
     * Set eventNumber
     *
     * @param integer $eventNumber
     *
     * @return Event
     */
    public function setEventNumber($eventNumber)
    {
        $this->eventNumber = $eventNumber;

        return $this;
    }

    /**
     * Get eventNumber
     *
     * @return int
     */
    public function getEventNumber()
    {
        return $this->eventNumber;
    }

    /**
     * Set calendar
     *
     * @param \ApiBundle\Entity\Calendar $calendar
     *
     * @return Event
     */
    public function setCalendar(\ApiBundle\Entity\Calendar $calendar = null)
    {
        $this->calendar = $calendar;

        return $this;
    }

    /**
     * Get calendar
     *
     * @return \ApiBundle\Entity\Calendar
     */
    public function getCalendar()
    {
        return $this->calendar;
    }
}
