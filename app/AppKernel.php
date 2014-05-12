<?php

use Symfony\Component\HttpKernel\Kernel;
use Symfony\Component\Config\Loader\LoaderInterface;

class AppKernel extends Kernel
{
    public function registerBundles()
    {
        $bundles = array(
            // Symfony  core bundles
            new Symfony\Bundle\FrameworkBundle\FrameworkBundle(),
            new Symfony\Bundle\SecurityBundle\SecurityBundle(),
            new Symfony\Bundle\TwigBundle\TwigBundle(),
            new Symfony\Bundle\MonologBundle\MonologBundle(),
            new Symfony\Bundle\SwiftmailerBundle\SwiftmailerBundle(),
            new Symfony\Bundle\AsseticBundle\AsseticBundle(),
            new Doctrine\Bundle\DoctrineBundle\DoctrineBundle(),
            new Sensio\Bundle\FrameworkExtraBundle\SensioFrameworkExtraBundle(),

            // MongoDB bundle
            new Doctrine\Bundle\MongoDBBundle\DoctrineMongoDBBundle(),

            // Sonata Admin Bundle
            new Sonata\CoreBundle\SonataCoreBundle(),
            new Sonata\BlockBundle\SonataBlockBundle(),
            new Sonata\jQueryBundle\SonatajQueryBundle(),
            new Knp\Bundle\MenuBundle\KnpMenuBundle(),
            new Sonata\DoctrineMongoDBAdminBundle\SonataDoctrineMongoDBAdminBundle(),
            new Sonata\AdminBundle\SonataAdminBundle(),

            // Doctrine Extension Bundle
            new Stof\DoctrineExtensionsBundle\StofDoctrineExtensionsBundle(),

            // JsRouting Bundle
            new FOS\JsRoutingBundle\FOSJsRoutingBundle(),

            // Rest Bundle
            new JMS\SerializerBundle\JMSSerializerBundle(),
            new FOS\RestBundle\FOSRestBundle(),
            new Nelmio\ApiDocBundle\NelmioApiDocBundle(),

            // FOSUserBundle
            new FOS\UserBundle\FOSUserBundle(),

            // CKEditor
            new Ivory\CKEditorBundle\IvoryCKEditorBundle(),

            // MopaBootstrapBundle
            new \Mopa\Bundle\BootstrapBundle\MopaBootstrapBundle(),

            // CustomBundle
            new NG\HomeBundle\HomeBundle(),
            new NG\UserBundle\UserBundle(),
            new NG\CircuitBundle\CircuitBundle(),
        );

        if (in_array($this->getEnvironment(), array('dev', 'test'))) {
            $bundles[] = new Symfony\Bundle\WebProfilerBundle\WebProfilerBundle();
            $bundles[] = new Sensio\Bundle\DistributionBundle\SensioDistributionBundle();
            $bundles[] = new Sensio\Bundle\GeneratorBundle\SensioGeneratorBundle();
        }

        return $bundles;
    }

    public function registerContainerConfiguration(LoaderInterface $loader)
    {
        $loader->load(__DIR__.'/config/config_'.$this->getEnvironment().'.yml');
    }
}
