<?php

namespace Vvar\SmallPurchaseProcedure\Listener;

use Zend\Http\PhpEnvironment\Request;
use Zend\Mvc\Application;
use Zend\ServiceManager\ServiceLocatorAwareInterface;
use Zend\ServiceManager\ServiceLocatorAwareTrait;
use Zend\EventManager\AbstractListenerAggregate;
use Zend\EventManager\Event;
use Vvar\SmallPurchaseProcedure\Mvc\Router\Router\Router;
use Zend\EventManager\EventManagerInterface;

/**
 * Class GridBackUrlEvent
 * @package Vvar\SmallPurchaseProcedure\Listener
 */
class GridBackUrlEvent extends AbstractListenerAggregate implements ServiceLocatorAwareInterface
{
    use ServiceLocatorAwareTrait;

    /**
     * Attach one or more listeners
     *
     * Implementors may add an optional $priority argument; the EventManager
     * implementation will pass this to the aggregate.
     *
     * @param EventManagerInterface $events
     *
     * @return void
     */
    public function attach(EventManagerInterface $events)
    {
        $this->listeners[] = $events->attach(\MteGrid\Module\Event::EVENT_BACKURL_RESOLVE, [$this, 'backurlResolve']);
    }

    /**
     * @param Event $event
     * @return string|void
     */
    public function backurlResolve(Event  $event)
    {
        /** @var Application $application */
        $application = $this->getServiceLocator()->get('application');
        /** @var Request $request */
        $request = $application->getRequest();
        if (!$request instanceof \Zend\Http\Request) {
            // Not an HTTP request? nothing to do
            return;
        }
        $router = new Router();
        return $router->getBasePath() . ltrim($request->getRequestUri(), '/');
    }
}