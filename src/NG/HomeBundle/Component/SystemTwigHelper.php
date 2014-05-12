<?php

namespace NG\HomeBundle\Component;

use Doctrine\ODM\MongoDB\DocumentManager;
use NG\HomeBundle\Document\Page;
use Symfony\Component\DependencyInjection\ContainerInterface;

class SystemTwigHelper {
    /** @var $container ContainerInterface */
    protected $container;

    /** @var $dm DocumentManager */
    protected $dm;

    /**
     * @param $container ContainerInterface
     */
    function __construct($container)
    {
        $this->container = $container;
        $this->dm = $container->get('doctrine_mongodb')->getManager();
    }

    /**
     * Top page menu
     * Only two levels
     * @return array
     */
    public function getTopMenu() {
        $pages = $this->dm->getRepository('HomeBundle:Page')->findBy(array('isMenuItem' => true), array('weight' => 'ASC'));
        $itemList = array(
            'blog' => array(
                'children' => array(),
                'page' => array(
                    'title' => 'Блоги',
                    'path' => $this->container->get('router')->generate('blog_list')
                )
            )
        );
        foreach ($pages as $page) {
            /** @var $page Page */
            if ($parent = $page->getParent()) {
                /** @var $parent Page */
                if ($itemList[$parent->getId()]) {
                    $itemList[$parent->getId()]['children'][$page->getId()] = array(
                        'page' => $page
                    );
                } else {
                    $itemList[$parent->getId()] = array(
                        'children' => array(
                            $page->getId() => array(
                                'page' => $page
                            )
                        )
                    );
                }
            } else {
                $itemList[$page->getId()] = array(
                    'page' => $page,
                    'children' => array()
                );
            }
        }

        return $itemList;
    }

    public function getLeftMenu() {

    }

    /**
     * @param $name
     * @return \NG\HomeBundle\Document\Block
     */
    public function getBlock($name) {
        $block = $this->container
            ->get('doctrine_mongodb')
            ->getManager()
            ->getRepository('HomeBundle:Block')
            ->findOneBy(array('machineName' => $name));
        return $block;
    }
}