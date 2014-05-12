<?php

namespace NG\CircuitBundle\Document;

use Doctrine\ODM\MongoDB\Mapping\Annotations as MongoDB;
use Doctrine\ODM\MongoDB\Mapping\Annotations\HasLifecycleCallbacks;

/**
 * Class for ComponentType
 *
 * @MongoDB\EmbeddedDocument()
 */
class Pin {
    /**
     * @MongoDB\Id()
     */
    private $id;

    /**
     * @MongoDB\Int(name="x")
     */
    protected $x;

    /**
     * @MongoDB\Int(name="y")
     */
    protected $y;

    /**
     * Function getter for $id
     *
     * @return mixed
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Function setter for $x
     *
     * @param mixed $x
     */
    public function setX($x)
    {
        $this->x = $x;
        return $this;
    }

    /**
     * Function getter for $x
     *
     * @return mixed
     */
    public function getX()
    {
        return $this->x;
    }

    /**
     * Function setter for $y
     *
     * @param mixed $y
     */
    public function setY($y)
    {
        $this->y = $y;
        return $this;
    }

    /**
     * Function getter for $y
     *
     * @return mixed
     */
    public function getY()
    {
        return $this->y;
    }
}