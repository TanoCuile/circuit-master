<?php

namespace NG\HomeBundle\Document;

use Doctrine\ODM\MongoDB\Mapping\Annotations as MongoDB;
use FOS\UserBundle\Model\User as BaseUser;
use Doctrine\ODM\MongoDB\Mapping\Annotations\HasLifecycleCallbacks;

/**
 * Class for block
 *
 * @MongoDB\Document(
 *     collection="block",
 *     indexes={
 *         @MongoDB\Index(keys={"_id"="asc", "ng.block"="asc"}, options={"background"="true"}),
 *     },
 *     requireIndexes=false
 * )
 * @HasLifecycleCallbacks()
 */
class Block
{
    /**
     * @MongoDB\Id
     */
    private $id;

    /**
     * @MongoDB\String(name="machine_name")
     */
    protected $machineName;

    /**
     * @MongoDB\String(name="name")
     */
    protected $name;

    /**
     * @MongoDB\String(name="text")
     */
    protected $text;

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
     * Function setter for $machineName
     *
     * @param mixed $machineName
     */
    public function setMachineName($machineName)
    {
        $this->machineName = $machineName;
        return $this;
    }

    /**
     * Function getter for $machineName
     *
     * @return mixed
     */
    public function getMachineName()
    {
        return $this->machineName;
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
     * Function setter for $text
     *
     * @param mixed $text
     */
    public function setText($text)
    {
        $this->text = $text;
        return $this;
    }

    /**
     * Function getter for $text
     *
     * @return mixed
     */
    public function getText()
    {
        return $this->text;
    }

    public function __toString(){
        if ($this->getName()) {
            return $this->getName();
        }
        return '';
    }
}