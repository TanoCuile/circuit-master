<?php

namespace NG\CircuitBundle\Document;

use Doctrine\ODM\MongoDB\Mapping\Annotations as MongoDB;
use Doctrine\ODM\MongoDB\Mapping\Annotations\HasLifecycleCallbacks;

/**
 * Class for Circuit
 *
 * @MongoDB\Document(
 *     collection="circuit",
 *     indexes={
 *         @MongoDB\Index(keys={"_id"="asc", "ng.circuit"="asc"}, options={"background"="true"}),
 *     },
 *     requireIndexes=false
 * )
 * @HasLifecycleCallbacks()
 */
class Circuit {
    /**
     * @MongoDB\Id()
     */
    private $id;

    /**
     * @MongoDB\String(name="name")
     */
    protected $name;

    /**
     * @MongoDB\String(name="description")
     */
    protected $description;

    /**
     * @MongoDB\ReferenceOne(targetDocument="NG\UserBundle\Document\User", simple=true)
     */
    protected $author;

    /**
     * @MongoDB\Hash(name="components")
     */
    protected $components;

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
     * Function setter for $author
     *
     * @param mixed $author
     */
    public function setAuthor($author)
    {
        $this->author = $author;
        return $this;
    }

    /**
     * Function getter for $author
     *
     * @return mixed
     */
    public function getAuthor()
    {
        return $this->author;
    }

    /**
     * Function setter for $components
     *
     * @param mixed $components
     */
    public function setComponents($components)
    {
        $this->components = $components;
        return $this;
    }

    /**
     * Function getter for $components
     *
     * @return mixed
     */
    public function getComponents()
    {
        return $this->components;
    }

    /**
     * Function setter for $name
     *
     * @param mixed $name
     */
    public function setName($name)
    {
        $this->name = $name;
        return $this;
    }

    /**
     * Function getter for $name
     *
     * @return mixed
     */
    public function getName()
    {
        return $this->name;
    }

    /**
     * Function setter for $description
     *
     * @param mixed $description
     */
    public function setDescription($description)
    {
        $this->description = $description;
        return $this;
    }

    /**
     * Function getter for $description
     *
     * @return mixed
     */
    public function getDescription()
    {
        return $this->description;
    }
}