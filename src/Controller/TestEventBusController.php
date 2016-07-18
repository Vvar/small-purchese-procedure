<?php
/**
 * @company MTE Telecom, LTD.
 * @author Gushchina Elena <gushchina@mte-telecom.ru>
 */

namespace SmallPurchaseProcedure\Controller;

use MteBus\EventBus\EventBusManager\EventBusManagerFacade;
use MteBus\EventBus\Exception\RuntimeException;
use MteBus\EventBus\Form\TestForm;
use MteBus\EventBus\Message\AbstractSimpleMessage;
use MteBus\EventBus\Message\EventBusMessagePluginManager;
use Zend\Mvc\Controller\AbstractActionController;
use Traversable;
use Zend\Mvc\MvcEvent;
use Zend\Http\PhpEnvironment\Request;

/**
 * Class TestEventBusController
 * @package SmallPurchaseProcedure\Controller
 */
class TestEventBusController extends AbstractActionController
{
    /**
     * @param MvcEvent $e
     * @return mixed
     * @throws \Exception
     */
    public function onDispatch(MvcEvent $e)
    {
        $config = $this->getServiceLocator()->get('config');
        if (array_key_exists('allowEventBusTestAction', $config)
            && $this->getServiceLocator()->get('config')['allowEventBusTestAction']
        ) {
            return parent::onDispatch($e);
        }
        throw new \Exception('Недостаточно прав', 403);

    }
    /**
     * @return array
     * @throws \Exception
     */
    public function indexAction()
    {
        /** @var array $config */
        $config = $this->getServiceLocator()->get('config');
        if (!array_key_exists('event_bus', $config)
            || (!is_array($config['event_bus']) && !$config['event_bus'] instanceof Traversable)
        ) {
            throw new RuntimeException('Не найден конфиг для шины данных или он имеет некорректный формат.');
        }
        /** @var EventBusMessagePluginManager $eventBusMessageManager */
        $eventBusMessageManager = $this->getServiceLocator()->get('eventBusMessageManager');

        /** @var TestForm $form */
        $form = $this->getServiceLocator()->get('eventBusTestForm');
        $error = null;
        /** @var Request $request */
        $request = $this->getRequest();
        if ($request->isPost()) {
            $data = $request->getPost();
            $form->setData($data);
            if ($form->isValid()) {
                $data = $form->getData()['data'];
                $data = @json_decode($data, true);
                if (!$data) {
                    throw new RuntimeException('Некорректный json');
                }
                if (!array_key_exists('messageClass', $data)
                    || !$data['messageClass']
                    || !class_exists($data['messageClass'])) {
                    throw new RuntimeException('Некорректный класс сообщения');
                }
                $messageClass = $data['messageClass'];
                unset($data['messageClass']);

                if (!array_key_exists('bindingKey', $data) || !$data['bindingKey']) {
                    throw new RuntimeException('Не задан bindingKey');
                }
                $bindingKey = $data['bindingKey'];
                unset($data['bindingKey']);

                /** @var AbstractSimpleMessage $message */
                $message = $eventBusMessageManager->get($messageClass);

                $message = $message->getHydrator()->hydrate($data, $message);
                /** @var EventBusManagerFacade $eventManager */
                $eventManager = $this->getServiceLocator()->get('event_bus.manager.ElectronicShop');
                $eventManager->trigger($bindingKey, $message);
            } else {
                $error = 'Ошибка отправки данных';
            }
        }

        return [
            'form' => $form,
            'error' => $error
        ];
    }
}