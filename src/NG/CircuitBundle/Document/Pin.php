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
    const ORIENTATION_TOP = 1;
    const ORIENTATION_RIGHT = 2;
    const ORIENTATION_BOTTOM = 3;
    const ORIENTATION_LEFT = 4;

    /**
     * @MongoDB\Id()
     */
    private $id;

    /**
     * @MongoDB\String(name="machineName")
     */
    protected $machineName;

    /**
     * @MongoDB\Int(name="orientation")
     */
    protected $orientation;

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

    /**
     * Function setter for $orientation
     *
     * @param mixed $orientation
     */
    public function setOrientation($orientation)
    {
        $this->orientation = $orientation;
        return $this;
    }

    /**
     * Function getter for $orientation
     *
     * @return mixed
     */
    public function getOrientation()
    {
        return $this->orientation;
    }

    public static function getOrientationList($keysOnly = false){
        $list = array(
            static::ORIENTATION_TOP => 'Верх',
            static::ORIENTATION_RIGHT => 'Право',
            static::ORIENTATION_BOTTOM => 'Низ',
            static::ORIENTATION_LEFT => 'Ліво'
        );

        if ($keysOnly) {
            return array_keys($list);
        }
        return $list;
    }
}
