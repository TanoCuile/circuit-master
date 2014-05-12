<?php

namespace NG\UserBundle\Document;

use Doctrine\ODM\MongoDB\Mapping\Annotations as MongoDB;
use FOS\UserBundle\Model\User as BaseUser;
use Doctrine\ODM\MongoDB\Mapping\Annotations\HasLifecycleCallbacks;

/**
 * Class for studentGroups
 *
 * @MongoDB\Document(
 *     collection="group",
 *     indexes={
 *         @MongoDB\Index(keys={"_id"="asc", "ng.group"="asc"}, options={"background"="true"}),
 *     },
 *     requireIndexes=false
 * )
 * @HasLifecycleCallbacks()
 */
class Group
{
    /**
     * @MongoDB\Id
     */
    private $id;

    /**
     * @MongoDB\String(name="name")
     */
    protected $name;

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

    public function __toString(){
        if ($this->getName()) {
            return $this->getName();
        }
        return '';
    }
}
