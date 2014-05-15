<?php

namespace NG\CircuitBundle\Controller;

use NG\CircuitBundle\Document\Circuit;
use NG\CircuitBundle\Form\Type\CircuitType;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;


/**
 * Class CircuitController
 * @package NG\CircuitBundle\Controller
 * @Route("/circuit")
 */
class CircuitController extends Controller {
    /**
     * @Route("/{user}/list", name="circuit_user_list")
     */
    public function circuitUserListAction($user) {
        $dm = $this->get('doctrine_mongodb')->getManager();

        $user = $dm->getRepository('UserBundle:User')->find($user);

        $circuits = $dm->getRepository('CircuitBundle:Circuit')->findBy(array('author' => $user->getId()));

        return new Response($this->renderView('CircuitBundle:Circuit:list.html.twig', array(
            'circuit_list' => $circuits
        )));
    }

    /**
     * @Route("/{id}", name="circuit")
     */
    public function circuitAction(Request $request, $id = '') {
        $dm = $this->get('doctrine_mongodb')->getManager();
        if ($id) {
            $circuit = $dm->getRepository('CircuitBundle:Circuit');
        } else {
            $circuit = new Circuit();
        }
        $form = $this->createForm(new CircuitType(), $circuit);
        if ($request->getMethod() == 'POST') {
            $form->handleRequest($request);
            if ($form->isValid()) {
                /** @var Circuit $circuit */
                $circuit = $form->getData();
                $circuit->setAuthor($this->getUser());
                $dm->persist($circuit);
                $dm->flush();
                return new RedirectResponse($this->get('router')->generate('constructor', array('id' => $circuit->getId())));
            }
        }
        return new Response($this->renderView('CircuitBundle:Circuit:initialize.html.twig', array(
            'form' => $form->createView(),
            'circuit' => $circuit
        )));
    }

    /**
     * @Route("/constructor/{id}", name="constructor")
     */
    public function constructorAction($id) {
        return new Response($this->renderView('@Circuit/Circuit/constructor.html.twig', array(

        )));
    }
}