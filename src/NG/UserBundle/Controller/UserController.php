<?php

namespace NG\UserBundle\Controller;

use NG\UserBundle\Document\User;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\HttpFoundation\Response;

class UserController extends Controller
{
    /**
     * @Route("/groups", name="admin_groups")
     */
    function allGroupsAction()
    {
        /** @var User $user */
        $user = $this->getUser();
        if($user->getPermission() < User::USER_PERMISSION_ADMIN){
            return new RedirectResponse($this->get('router')->generate('home'));
        }

        $groups = $this->get('doctrine_mongodb')->getManager()
            ->getRepository('UserBundle:Group')
            ->findAll();

        return new Response($this->renderView(
            'UserBundle:User:groups.html.twig', array(
                'user' => $user,
                'groups' => $groups
            )
        ));
    }

    /**
     * @Route("/professor/{id}/groups", name="professor_groups")
     */
    function professorGroupsAction($id)
    {
        $dm = $this->get('doctrine_mongodb')
            ->getManager();

        $user = $dm->getRepository('UserBundle:User')
            ->find($id);
        if ($user->getPermission() == User::USER_PERMISSION_PROFESSOR) {
            return new Response($this->renderView(
                'UserBundle:User:professor_groups.html.twig', array(
                    'user' => $user
                )
            ));
        } else {
            return new RedirectResponse($this->get('router')->generate('home'));
        }
    }

    /**
     * @Route("/group-members/{id}", name="group_members")
     */
    function groupMembersAction($id)
    {
        $dm = $this->get('doctrine_mongodb')
            ->getManager();
        $group = $dm->getRepository('UserBundle:Group')
            ->find($id);
        $members = $dm->getRepository('UserBundle:User')
            ->findBy(array('group' => $group->getId(), 'permission' => User::USER_PERMISSION_STUDENT));

        return new Response($this->renderView('UserBundle:User:group_members.html.twig', array(
            'group' => $group,
            'members' => $members
        )));
    }
}