<?php

namespace NG\HomeBundle\Document;

use Doctrine\ODM\MongoDB\Mapping\Annotations as MongoDB;
use FOS\UserBundle\Model\User as BaseUser;
use Doctrine\ODM\MongoDB\Mapping\Annotations\HasLifecycleCallbacks;

/**
 * Class for page
 *
 * @MongoDB\Document(
 *     collection="page",
 *     indexes={
 *         @MongoDB\Index(keys={"_id"="asc", "ng.page"="asc"}, options={"background"="true"}),
 *     },
 *     requireIndexes=false
 * )
 * @HasLifecycleCallbacks()
 */
class Page
{
    /**
     * @MongoDB\Id
     */
    private $id;

    /**
     * @MongoDB\String(name="url")
     */
    protected $url;

    /**
     * @MongoDB\String(name="title")
     */
    protected $title;

    /**
     * @MongoDB\String(name="text")
     */
    protected $text;

    /**
     * @MongoDB\ReferenceOne(targetDocument="Page", simple=true)
     */
    protected $parent;

    /**
     * @MongoDB\Boolean(name="isMenuItem")
     */
    protected $isMenuItem;

    /**
     * @MongoDB\Int(name="weight")
     */
    protected $weight;

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
     * Function setter for $title
     *
     * @param mixed $title
     */
    public function setTitle($title)
    {
        $this->title = $title;
        return $this;
    }

    /**
     * Function getter for $title
     *
     * @return mixed
     */
    public function getTitle()
    {
        return $this->title;
    }

    /**
     * Function setter for $url
     *
     * @param mixed $url
     */
    public function setUrl($url)
    {
        $this->url = $url;
        return $this;
    }

    /**
     * Function getter for $url
     *
     * @return mixed
     */
    public function getUrl()
    {
        return $this->url;
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

    /**
     * Function setter for $isMenuItem
     *
     * @param mixed $isMenuItem
     */
    public function setIsMenuItem($isMenuItem)
    {
        $this->isMenuItem = $isMenuItem;
        return $this;
    }

    /**
     * Function getter for $isMenuItem
     *
     * @return mixed
     */
    public function getIsMenuItem()
    {
        return $this->isMenuItem;
    }

    /**
     * Function setter for $parent
     *
     * @param mixed $parent
     */
    public function setParent($parent)
    {
        $this->parent = $parent;
        return $this;
    }

    /**
     * Function getter for $parent
     *
     * @return mixed
     */
    public function getParent()
    {
        return $this->parent;
    }

    /**
     * Function setter for $weight
     *
     * @param mixed $weight
     */
    public function setWeight($weight)
    {
        $this->weight = $weight;
        return $this;
    }

    /**
     * Function getter for $weight
     *
     * @return mixed
     */
    public function getWeight()
    {
        return $this->weight;
    }

    public function __toString(){
        if ($this->getTitle()) {
            return $this->getTitle();
        }
        return '';
    }
}