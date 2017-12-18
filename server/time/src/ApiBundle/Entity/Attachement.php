<?php

namespace ApiBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Attachement
 *
 * @ORM\Table(name="attachement")
 * @ORM\Entity(repositoryClass="ApiBundle\Repository\AttachementRepository")
 * @ORM\InheritanceType("SINGLE_TABLE")
 * @ORM\DiscriminatorColumn(name="attachementType", type="string")
 * @ORM\DiscriminatorMap({"message" = "MessageAttachement", "image" = "ImageAttachement"})
 */
abstract class Attachement
{
    /**
     * @var int
     *
     * @ORM\Column(name="id_attachement", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    private $id_attachement;
	
	/**
	 *
	 * @ORM\OneToOne(targetEntity="Event", inversedBy="attachement")
	 * @ORM\JoinColumn(name="event_id", referencedColumnName="id")
	 */
	private $event;


    /**
     * Get id
     *
     * @return int
     */
    public function getId()
    {
        return $this->id_attachement;
    }

    /**
     * Set event
     *
     * @param \ApiBundle\Entity\Event $event
     *
     * @return Attachement
     */
    public function setEvent(\ApiBundle\Entity\Event $event = null)
    {
        $this->event = $event;

        return $this;
    }

    /**
     * Get event
     *
     * @return \ApiBundle\Entity\Event
     */
    public function getEvent()
    {
        return $this->event;
    }
}
