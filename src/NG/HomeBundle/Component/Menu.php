<?php

namespace NG\HomeBundle\Component;

class Menu
{
    protected $items = array();

    public function getItems()
    {
        uasort($this->items, array($this, 'sortByWeight'));
        return $this->items;
    }

    public function addItem($id, $value)
    {
        $this->items[$id] = $value;
    }

    public function createItem($href, $title, $weight = 0, $children = array(), $classes = '', $containerClasses = '')
    {
        return array(
            'url' => $href,
            'title' => $title,
            'children' => $children,
            'weight' => $weight,
            'class' => $classes,
            'container_class' => $containerClasses
        );
    }

    public function addDelimiter($weight) {

    }

    public function addChild($to, $id, $value)
    {
        $this->items[$to]['children'][$id] = $value;
    }

    /**
     * Just sorting callback
     */
    protected function sortByWeight($a, $b)
    {
        if ($a['weight'] == $b['weight']) {
            return 0;
        }
        return $a['weight'] > $b['weight'] ? 1 : -1;
    }
}