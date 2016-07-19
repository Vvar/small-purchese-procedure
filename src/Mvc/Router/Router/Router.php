<?php

namespace Vvar\SmallPurchaseProcedure\Mvc\Router\Router;


use Zend\Mvc\Router\Http\TreeRouteStack;
use Zend\Mvc\Router\SimpleRouteStack;

/**
 * Перегруенный роутер с возможностью устанавливать basePAth (префикс для всех урлов)
 *
 * Class Router
 * @package Application\Mvc\Router\Router
 */
class Router extends TreeRouteStack
{
    /**
     * @var string
     */
    protected $basePath = '/electronicshop/';

    /**
     * @param array $options
     * @return SimpleRouteStack
     */
    public static function factory($options = array())
    {
        $basePath = (array_key_exists('basePath', $options)) ? $options['basePath'] : null;
        unset($options['basePath']);
        /* @var Router $instance */
        $instance = parent::factory($options);
        if ($basePath !== null) {
            $instance->setBasePath($basePath);
        }
        return $instance;
    }

    /**
     * @param array $params
     * @param array $options
     * @return mixed|string
     */
    public function assemble(array $params = array(), array $options = array())
    {
        $url = parent::assemble($params, $options);


        if(array_key_exists('doNotUseBasePath', $options) && $options['doNotUseBasePath']) {
            return $url;
        }

        return $this->getBasePath() . ltrim($url, '/');
    }

    /**
     * @return string
     */
    public function getBasePath()
    {
        return $this->basePath;
    }

    /**
     * @param string $basePath
     * @return $this
     */
    public function setBasePath($basePath)
    {
        $this->basePath = $basePath;
        return $this;
    }
}