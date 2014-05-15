<?php

namespace NG\HomeBundle\EventListener;

use NG\HomeBundle\Component\Menu;
use NG\UserBundle\Document\User;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;

class KernelListener {
    protected $container;
    public function __construct(ContainerInterface $container){
        $this->container = $container;
    }

    public function onKernelController(){
        $this->evenLeftMenu();
    }

    public function evenLeftMenu() {
        /** @var Menu $leftMenu */
        $leftMenu = $this->container->get('ng.menu.left_menu');
        $router = $this->container->get('router');
        $items = array(
            $router->generate('fos_user_profile_show') => 'Преглянути профіль',
            $router->generate('fos_user_profile_edit') => 'Редагувати профіль'
        );
        if ($user = $this->getUser()) {
            $items[$router->generate('circuit_user_list', array('user' => $user->getId()))] = 'Мої схеми';
            if ($user->getPermission() > User::USER_PERMISSION_STUDENT) {
                $items[$router->generate('admin_groups', array('user' => $user->getId()))] = 'Список груп';
            }
        }
        $i = 0;
        foreach ($items as $href => $item){
            $item = $leftMenu->createItem($href, $item, ++$i);
            $leftMenu->addItem($href, $item);
        }
    }

    /**
     * @return User|null
     */
    public function getUser(){
        $token = $this->container->get('security.context')->getToken();
        /** @var $token TokenInterface */
        if ($token && ($user = $token->getUser())){
            if (is_object($user)){
                return $user;
            }
        }
        return null;
    }
}