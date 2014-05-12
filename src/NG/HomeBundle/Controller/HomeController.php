<?php

namespace NG\HomeBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Response;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;

class HomeController extends Controller {
    /**
     * @Route("/", name="home")
     */
    function indexAction() {
        $blogList = $this->get('doctrine_mongodb')
            ->getManager()
            ->getRepository('HomeBundle:Blog')
            ->findBy(array('published' => true), array('created' => 'DESC'), 5);
        return new Response(
            $this->renderView("HomeBundle:Home:index.html.twig", array(
                'blog_list' => $blogList
            ))
        );
    }

    /**
     * @Route("/page/{url}", name="page")
     */
    function pageAction($url) {
        $page = $this->get('doctrine_mongodb')->getManager()->getRepository('HomeBundle:Page')->findOneBy(array('url' => $url));

        return new Response(
            $this->renderView('@Home/Home/page.html.twig', array(
                'page' => $page
            ))
        );
    }

    /**
     * @Route("/blog", name="blog_list")
     */
    function blogListAction() {
        $blogList = $this->get('doctrine_mongodb')
            ->getManager()
            ->getRepository('HomeBundle:Blog')
            ->findBy(array('published' => true), array('created' => 'DESC'));
        return new Response($this->renderView(
            '@Home/Home/blog_list.html.twig', array(
                'blog_list' => $blogList
            )
        ));
    }

    /**
     * @Route("/blog/{url}", name="blog")
     */
    function blogAction($url) {
        $blog = $this->get('doctrine_mongodb')
            ->getManager()
            ->getRepository('HomeBundle:Blog')
            ->findOneBy(array('url' => $url));
        return new Response($this->renderView(
            'HomeBundle:Home:blog.html.twig', array(
                'blog' => $blog
            )
        ));
    }
}