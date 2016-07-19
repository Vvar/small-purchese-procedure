<?php

namespace Vvar\SmallPurchaseProcedure\Mvc\Handler;

use Zend\Http\Request;
use Zend\Http\Response;
use Zend\Mvc\MvcEvent;

/**
 * Class Exception
 * @package Application\Mvc\Handler
 */
class Exception 
{
    /**
     * @param MvcEvent $event
     * @return void
     */
    public function handle (MvcEvent $event)
    {
        $error = $event->getError();
        if (empty($error)) {
            return;
        }
        $result = $event->getResult();
        if ($result instanceof \Zend\Stdlib\ResponseInterface) {
            return;
        }
        switch ($error) {
            case \Zend\Mvc\Application::ERROR_CONTROLLER_NOT_FOUND:
            case \Zend\Mvc\Application::ERROR_CONTROLLER_INVALID:
            case \Zend\Mvc\Application::ERROR_ROUTER_NO_MATCH:
                // Specifically not handling these
                return;

            case \Zend\Mvc\Application::ERROR_EXCEPTION:
            default:
                /** @var \Exception $exception */
                $exception = $event->getParam('exception');
                if ($event->getRequest() instanceof Request
                    && $event->getRequest()->isXmlHttpRequest()) {
                    $response = $event->getResponse();
                    $variables = $event->getResult()->getVariables();
                    $variables['exception'] = [
                        'message' => $exception->getMessage(),
                        'code' => $exception->getCode(),
                    ];
                    $response->setContent(json_encode($variables));
                    $event->setResult($response);
                }
                $availableExceptionCodes = [
                    403,
                    404,
                    500
                ];
                $response = $event->getResponse();
                if ($exception instanceof \Exception && in_array($exception->getCode(), $availableExceptionCodes)
                    && $response && $response instanceof \Zend\Http\Response
                ) {
                    $response->setStatusCode($exception->getCode());
                }
                break;
        }
    }

}