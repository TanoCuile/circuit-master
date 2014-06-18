<?php

namespace NG\HomeBundle\Component;

use Doctrine\ODM\MongoDB\DocumentManager;
use NG\CircuitBundle\Document\ComponentType;
use NG\HomeBundle\Document\Page;
use NG\UserBundle\Document\User;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;

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

    /**
     * @return User|null
     */
    public function getUser(){
        $token = $this->container->get('security.context')->getToken();
        /** @var $token TokenInterface */
        if ($token && ($user = $token->getUser())){
            return $user;
        }
        return null;
    }

    public function getComponentTypes() {
        $components = $this->container->get('doctrine_mongodb')
            ->getManager()
            ->getRepository('CircuitBundle:ComponentType')
            ->findAll();
        $labels = ComponentType::getAreaLabels();
        $result = array(
            ComponentType::COMPONENT_AREA_ELECTRIC => array(
                'label' => $labels[ComponentType::COMPONENT_AREA_ELECTRIC],
                'groups' => array()
            ),
            ComponentType::COMPONENT_AREA_PNEUMO => array(
                'label' => $labels[ComponentType::COMPONENT_AREA_PNEUMO],
                'groups' => array()
            )
        );
        $i = 0;
        $g = 0;
        foreach($components as $component) {
            /** @var $component ComponentType */
            if (!isset($result[$component->getArea()]['groups'][$component->getGroup()->getId()])) {
                $result[$component->getArea()]['groups'][$component->getGroup()->getId()] = array(
                    'label' => $component->getGroup()->getName(),
                    'components' => array()
                );
            }
            $result[$component->getArea()]['groups'][$component->getGroup()->getId()]['components'][$g][$component->getId()] = $component;
            if ($i == 1) {
                $i = 0;
                $g++;
            }
        }

        return $result;
    }
}