// <Static Constants> (PKI environment related) - * for friendly readable purpose only

var
/***** ____Certificates Store's______ concerned settings ***********/

//--CAPICOM.CAPICOM_STORE_OPEN_MODE ()    -    for Store.Open()
    CAPICOM_STORE_OPEN_READ_ONLY        = 0,    //
    CAPICOM_STORE_OPEN_READ_WRITE       = 1,    //
    CAPICOM_STORE_OPEN_MAXIMUM_ALLOWED  = 2,    // RW[if permission exists],  otherwise - RO
    CAPICOM_STORE_OPEN_EXISTING_ONLY    = 128,  //0x0080 Introduced by CAPICOM 2.0 (can be mask-joined with 3 basic)
    CAPICOM_STORE_OPEN_INCLUDE_ARCHIVED = 256,  //0x0100 Introduced by CAPICOM 2.0 (can be mask-joined with 3 basic)

//--CAPICOM.CAPICOM_STORE_LOCATION ()  - indicates the location of the Store [Store.Open; PrivateKey.Open]
    CAPICOM_MEMORY_STORE                = 0,      //
    CAPICOM_LOCAL_MACHINE_STORE         = 1,      //
    CAPICOM_CURRENT_USER_STORE          = 2,      //
    CAPICOM_ACTIVE_DIRECTORY_USER_STORE = 3,      //
    CAPICOM_SMART_CARD_USER_STORE       = 4,      //

//--CAPICOM_STORE_SAVE_AS_TYPE  ()    -     []
    CAPICOM_STORE_SAVE_AS_SERIALIZED  = 0,      //
    CAPICOM_STORE_SAVE_AS_PKCS7       = 1,      //

//--CAPICOM_KEY_STORAGE_FLAG  ()  -   defines key storage flags [Certificate.Load;  Store.Load]
    CAPICOM_KEY_STORAGE_DEFAULT         = 0,      //
    CAPICOM_KEY_STORAGE_EXPORTABLE      = 1,      //
    CAPICOM_KEY_STORAGE_USER_PROTECTED  = 2,      //

//--CAPICOM_KEY_SPEC   ()  -   defines key specifications [PrivateKey.KeySpec property; PrivateKey.Open method]
    CAPICOM_KEY_SPEC_KEYEXCHANGE        = 1,      //

//--CAPICOM_KEY_LOCATION   ()  -    [Certificate.Load method]
    CAPICOM_CURRENT_USER_KEY    = 0,
    CAPICOM_LOCAL_MACHINE_KEY   = 1,

//--CAPICOM_KEY_USAGE ()   -   Introduced by CAPICOM 2.0
    CAPICOM_ENCIPHER_ONLY_KEY_USAGE     = 1,      //
    CAPICOM_OFFLINE_CRL_SIGN_KEY_USAGE  = 2,      //
    CAPICOM_CRL_SIGN_KEY_USAGE          = 2,      //
    CAPICOM_KEY_CERT_SIGN_KEY_USAGE     = 4,      //
    CAPICOM_KEY_AGREEMENT_KEY_USAGE     = 8,      //
    CAPICOM_DATA_ENCIPHERMENT_KEY_USAGE = 16,     //0x10
    CAPICOM_KEY_ENCIPHERMENT_KEY_USAGE  = 32,     //0x20
    CAPICOM_NON_REPUDIATION_KEY_USAGE   = 64,     //0x40
    CAPICOM_DIGITAL_SIGNATURE_KEY_USAGE = 128,    //0x80
    CAPICOM_DECIPHER_ONLY_KEY_USAGE     = 32768,  //0x8000

//--CAPICOM_EKU ()   -   defines the Extended Key Usage names based on where they can be used   [used by the EKU.Name property]
    CAPICOM_EKU_OTHER                   = 0,
    CAPICOM_EKU_SERVER_AUTH             = 1,
    CAPICOM_EKU_CLIENT_AUTH             = 2,
    CAPICOM_EKU_CODE_SIGNING            = 3,
    CAPICOM_EKU_EMAIL_PROTECTION        = 4,
    CAPICOM_EKU_SMARTCARD_LOGON         = 5,
    CAPICOM_EKU_ENCRYPTING_FILE_SYSTEM  = 6,     //



/***** ____Certificates'____ concerned settings ********************/
//--CAPICOM_CERT_INFO_TYPE  ()  -   information to be queried from a certificate [used by the Certificate.GetInfo method]
    CAPICOM_CERT_INFO_SUBJECT_SIMPLE_NAME = 0,    //
    CAPICOM_CERT_INFO_ISSUER_SIMPLE_NAME  = 1,    //
    CAPICOM_CERT_INFO_SUBJECT_EMAIL_NAME  = 2,    //
    CAPICOM_CERT_INFO_ISSUER_EMAIL_NAME   = 3,    //
    CAPICOM_CERT_INFO_SUBJECT_UPN         = 4,    // Introduced by CAPICOM 2.0
    CAPICOM_CERT_INFO_ISSUER_UPN          = 5,    // Introduced by CAPICOM 2.0
    CAPICOM_CERT_INFO_SUBJECT_DNS_NAME    = 6,    // Introduced by CAPICOM 2.0
    CAPICOM_CERT_INFO_ISSUER_DNS_NAME     = 7,    // Introduced by CAPICOM 2.0

//--CAPICOM_CERTIFICATE_FIND_TYPE   ()  -    This enumeration type was introduced in CAPICOM 2.0 [used by the Certificates.Find method]
    CAPICOM_CERTIFICATE_FIND_SHA1_HASH          = 0,
    CAPICOM_CERTIFICATE_FIND_SUBJECT_NAME       = 1,
    CAPICOM_CERTIFICATE_FIND_ISSUER_NAME        = 2,
    CAPICOM_CERTIFICATE_FIND_ROOT_NAME          = 3,
    CAPICOM_CERTIFICATE_FIND_TEMPLATE_NAME      = 4,
    CAPICOM_CERTIFICATE_FIND_EXTENSION          = 5,
    CAPICOM_CERTIFICATE_FIND_EXTENDED_PROPERTY  = 6,
    CAPICOM_CERTIFICATE_FIND_APPLICATION_POLICY = 7,
    CAPICOM_CERTIFICATE_FIND_CERTIFICATE_POLICY = 8,
    CAPICOM_CERTIFICATE_FIND_TIME_VALID         = 9,
    CAPICOM_CERTIFICATE_FIND_TIME_NOT_YET_VALID = 10,
    CAPICOM_CERTIFICATE_FIND_TIME_EXPIRED       = 11,
    CAPICOM_CERTIFICATE_FIND_KEY_USAGE          = 12,

//--CAPICOM_CHECK_FLAG  ()  -   defines the conditions for which a certificate chain is to be checked
    CAPICOM_CHECK_NONE                      = 0,    //
    CAPICOM_CHECK_TRUSTED_ROOT              = 1,    //
    CAPICOM_CHECK_TIME_VALIDITY             = 2,    //
    CAPICOM_CHECK_SIGNATURE_VALIDITY        = 4,    //
    CAPICOM_CHECK_ONLINE_REVOCATION_STATUS  = 8,    //
    CAPICOM_CHECK_OFFLINE_REVOCATION_STATUS = 16,   //
    CAPICOM_CHECK_COMPLETE_CHAIN            = 32,   //
    CAPICOM_CHECK_NAME_CONSTRAINTS          = 64,   //
    CAPICOM_CHECK_BASIC_CONSTRAINTS         = 128,  //
    CAPICOM_CHECK_NESTED_VALIDITY_PERIOD    = 256,  //
    CAPICOM_CHECK_ONLINE_ALL                = 495,  //
    CAPICOM_CHECK_OFFLINE_ALL               = 503,  //




/***** ____Signature's____ concerned settings ********************/
    //--CAPICOM_ATTRIBUTE  ()    -  used by the Attribute.Name property
    CAPICOM_AUTHENTICATED_ATTRIBUTE_SIGNING_TIME          = 0,    //
    CAPICOM_AUTHENTICATED_ATTRIBUTE_DOCUMENT_NAME         = 1,    //
    CAPICOM_AUTHENTICATED_ATTRIBUTE_DOCUMENT_DESCRIPTION  = 2,    //

//--CAPICOM_SIGNED_DATA_VERIFY_FLAG ()    -
    CAPICOM_VERIFY_SIGNATURE_ONLY             = 1,  //
    CAPICOM_VERIFY_SIGNATURE_AND_CERTIFICATE  = 0,  //




/***** ____Common____ concerned settings ********************/
    //--CAPICOM_ENCODING_TYPE   ()    -   [... Certificate.Export method; ExtendedProperty.Value property; SignedData.Sign method; SignedData.CoSign method; ...]
    CAPICOM_ENCODE_ANY    = -1,
    CAPICOM_ENCODE_BASE64 = 0,
    CAPICOM_ENCODE_BINARY = 1,

//--CAPICOM_OID    () provides the names for CAPICOM object identifiers   -   [used by the OID.Name property]
    CAPICOM_OID_OTHER                                     = 0,
    CAPICOM_OID_AUTHORITY_KEY_IDENTIFIER_EXTENSION        = 1,
    CAPICOM_OID_KEY_ATTRIBUTES_EXTENSION                  = 2,
    CAPICOM_OID_CERT_POLICIES_95_EXTENSION                = 3,
    CAPICOM_OID_KEY_USAGE_RESTRICTION_EXTENSION           = 4,
    CAPICOM_OID_LEGACY_POLICY_MAPPINGS_EXTENSION          = 5,
    CAPICOM_OID_SUBJECT_ALT_NAME_EXTENSION                = 6,
    CAPICOM_OID_ISSUER_ALT_NAME_EXTENSION                 = 7,
    CAPICOM_OID_BASIC_CONSTRAINTS_EXTENSION               = 8,
    CAPICOM_OID_SUBJECT_KEY_IDENTIFIER_EXTENSION          = 9,
    CAPICOM_OID_KEY_USAGE_EXTENSION                       = 10,
    CAPICOM_OID_PRIVATEKEY_USAGE_PERIOD_EXTENSION         = 11,
    CAPICOM_OID_SUBJECT_ALT_NAME2_EXTENSION               = 12,
    CAPICOM_OID_ISSUER_ALT_NAME2_EXTENSION                = 13,
    CAPICOM_OID_BASIC_CONSTRAINTS2_EXTENSION              = 14,
    CAPICOM_OID_NAME_CONSTRAINTS_EXTENSION                = 15,
    CAPICOM_OID_CRL_DIST_POINTS_EXTENSION                 = 16,
    CAPICOM_OID_CERT_POLICIES_EXTENSION                   = 17,
    CAPICOM_OID_POLICY_MAPPINGS_EXTENSION                 = 18,
    CAPICOM_OID_AUTHORITY_KEY_IDENTIFIER2_EXTENSION       = 19,
    CAPICOM_OID_POLICY_CONSTRAINTS_EXTENSION              = 20,
    CAPICOM_OID_ENHANCED_KEY_USAGE_EXTENSION              = 21,
    CAPICOM_OID_CERTIFICATE_TEMPLATE_EXTENSION            = 22,
    CAPICOM_OID_APPLICATION_CERT_POLICIES_EXTENSION       = 23,
    CAPICOM_OID_APPLICATION_POLICY_MAPPINGS_EXTENSION     = 24,
    CAPICOM_OID_APPLICATION_POLICY_CONSTRAINTS_EXTENSION  = 25,
    CAPICOM_OID_AUTHORITY_INFO_ACCESS_EXTENSION           = 26,
    CAPICOM_OID_SERVER_AUTH_EKU                           = 100,
    CAPICOM_OID_CLIENT_AUTH_EKU                           = 101,
    CAPICOM_OID_CODE_SIGNING_EKU                          = 102,
    CAPICOM_OID_EMAIL_PROTECTION_EKU                      = 103,
    CAPICOM_OID_IPSEC_END_SYSTEM_EKU                      = 104,
    CAPICOM_OID_IPSEC_TUNNEL_EKU                          = 105,
    CAPICOM_OID_IPSEC_USER_EKU                            = 106,
    CAPICOM_OID_TIME_STAMPING_EKU                         = 107,
    CAPICOM_OID_CTL_USAGE_SIGNING_EKU                     = 108,
    CAPICOM_OID_TIME_STAMP_SIGNING_EKU                    = 109,
    CAPICOM_OID_SERVER_GATED_CRYPTO_EKU                   = 110,
    CAPICOM_OID_ENCRYPTING_FILE_SYSTEM_EKU                = 111,
    CAPICOM_OID_EFS_RECOVERY_EKU                          = 112,
    CAPICOM_OID_WHQL_CRYPTO_EKU                           = 113,
    CAPICOM_OID_NT5_CRYPTO_EKU                            = 114,
    CAPICOM_OID_OEM_WHQL_CRYPTO_EKU                       = 115,
    CAPICOM_OID_EMBEDED_NT_CRYPTO_EKU                     = 116,
    CAPICOM_OID_ROOT_LIST_SIGNER_EKU                      = 117,
    CAPICOM_OID_QUALIFIED_SUBORDINATION_EKU               = 118,
    CAPICOM_OID_KEY_RECOVERY_EKU                          = 119,
    CAPICOM_OID_DIGITAL_RIGHTS_EKU                        = 120,
    CAPICOM_OID_LICENSES_EKU                              = 121,
    CAPICOM_OID_LICENSE_SERVER_EKU                        = 122,
    CAPICOM_OID_SMART_CARD_LOGON_EKU                      = 123,
    CAPICOM_OID_PKIX_POLICY_QUALIFIER_CPS                 = 124,
    CAPICOM_OID_PKIX_POLICY_QUALIFIER_USERNOTICE = 125,
//--CAPICOM_ERROR_CODE
    CAPICOM_E_ENCODE_INVALID_TYPE = -2138570496,
    CAPICOM_E_EKU_INVALID_OID = -2138570240,
    CAPICOM_E_EKU_OID_NOT_INITIALIZED = -2138570239,
    CAPICOM_E_CERTIFICATE_NOT_INITIALIZED = -2138570224,
    CAPICOM_E_CERTIFICATE_NO_PRIVATE_KEY = -2138570223,
    CAPICOM_E_CHAIN_NOT_BUILT = -2138570208,
    CAPICOM_E_STORE_NOT_OPENED = -2138570192,
    CAPICOM_E_STORE_EMPTY = -2138570191,
    CAPICOM_E_STORE_INVALID_OPEN_MODE = -2138570190,
    CAPICOM_E_STORE_INVALID_SAVE_AS_TYPE = -2138570189,
    CAPICOM_E_ATTRIBUTE_NAME_NOT_INITIALIZED = -2138570176,
    CAPICOM_E_ATTRIBUTE_VALUE_NOT_INITIALIZED = -2138570175,
    CAPICOM_E_ATTRIBUTE_INVALID_NAME = -2138570174,
    CAPICOM_E_ATTRIBUTE_INVALID_VALUE = -2138570173,
    CAPICOM_E_SIGNER_NOT_INITIALIZED = -2138570160,
    CAPICOM_E_SIGNER_NOT_FOUND = -2138570159,
    CAPICOM_E_SIGNER_NO_CHAIN = -2138570158,
    CAPICOM_E_SIGNER_INVALID_USAGE = -2138570157,
    CAPICOM_E_SIGN_NOT_INITIALIZED = -2138570144,
    CAPICOM_E_SIGN_INVALID_TYPE = -2138570143,
    CAPICOM_E_SIGN_NOT_SIGNED = -2138570142,
    CAPICOM_E_INVALID_ALGORITHM = -2138570128,
    CAPICOM_E_INVALID_KEY_LENGTH = -2138570127,
    CAPICOM_E_ENVELOP_NOT_INITIALIZED = -2138570112,
    CAPICOM_E_ENVELOP_INVALID_TYPE = -2138570111,
    CAPICOM_E_ENVELOP_NO_RECIPIENT = -2138570110,
    CAPICOM_E_ENVELOP_RECIPIENT_NOT_FOUND = -2138570109,
    CAPICOM_E_ENCRYPT_NOT_INITIALIZED = -2138570096,
    CAPICOM_E_ENCRYPT_INVALID_TYPE = -2138570095,
    CAPICOM_E_ENCRYPT_NO_SECRET = -2138570094,
    CAPICOM_E_PRIVATE_KEY_NOT_INITIALIZED = -2138569984,
    CAPICOM_E_PRIVATE_KEY_NOT_EXPORTABLE = -2138569983,
    CAPICOM_E_ENCODE_NOT_INITIALIZED = -2138569952,
    CAPICOM_E_EXTENSION_NOT_INITIALIZED = -2138569936,
    CAPICOM_E_PROPERTY_NOT_INITIALIZED = -2138569920,
    CAPICOM_E_FIND_INVALID_TYPE = -2138569904,
    CAPICOM_E_FIND_INVALID_PREDEFINED_POLICY = -2138569903,
    CAPICOM_E_CODE_NOT_INITIALIZED = -2138569888,
    CAPICOM_E_CODE_NOT_SIGNED = -2138569887,
    CAPICOM_E_CODE_DESCRIPTION_NOT_INITIALIZED = -2138569886,
    CAPICOM_E_CODE_DESCRIPTION_URL_NOT_INITIALIZED = -2138569885,
    CAPICOM_E_CODE_INVALID_TIMESTAMP_URL = -2138569884,
    CAPICOM_E_HASH_NO_DATA = -2138569872,
    CAPICOM_E_INVALID_CONVERT_TYPE = -2138569856,
    CAPICOM_E_NOT_SUPPORTED = -2138568448,
    CAPICOM_E_UI_DISABLED = -2138568447,
    CAPICOM_E_CANCELLED = -2138568446,
    CAPICOM_E_NOT_ALLOWED = -2138568445,
    CAPICOM_E_OUT_OF_RESOURCE = -2138568444,
    CAPICOM_E_INTERNAL = -2138568431,
    CAPICOM_E_UNKNOWN = -2138568295,

//--
CERT_KEY_SPEC_PROP_ID = 6;

// </Static Constants> (PKI environment related) - * for friendly readable purpose only

/**
 * CAPICOM Object
 */
function Capicom()
{
    this.error = 0;
    this.store = null;
    this.certificate = null;

    var instance = this;

    /**
     * Функция обработки ошибок.
     * @return false
     */
    function error(error)
    {
        if (!instance.error) {
            instance.error = true;
            alert(error);
        }
        return false;
    }

    /**
     * Инициализирует хранилище сертификатов
     * @return {Boolean}
     */
    function init()
    {
        if (!$.browser.msie) {
            throw   'Внимание! Для корректной работы системы требуется Internet Explorer версии не ниже 7.0. ' +
                    'Вы можете бесплатно установить последнюю версию Internet Explorer с сайта производителя. ' +
                    '<a href="http://www.microsoft.com/rus/windows/internet-explorer/" target="_blank">Загрузить Internet Explorer</a>.';
        }

        // получаем хранилище CAPICOM.
        instance.store = new ActiveXObject("CAPICOM.Store");

        // открываем персональное хранилище сертификатов.
        instance.store.Open(CAPICOM_CURRENT_USER_STORE, 'My', CAPICOM_STORE_OPEN_READ_ONLY);

        return true;
    }

    /**
     * Инициализатор
     */
    this.init = function()
    {
        try {
            init();
        } catch (e) {
            error(e);
        }
    };

    /**
     * Открывает окно выбора сертификата.
     */
    this.selectCertificate = function()
    {
        try {
            this.certificate = this.store.Certificates.Select('Выберите сертификат.', "Выберите один из сертификатов", false);

            return this.certificate;
        } catch(e) {
            error(e);
        }
        return false;
    };

    /**
     * Получает сертификаты из личного хранилища сертификатов на компьютере пользователя.
     */
    this.getCertificates = function()
    {
        if (this.store.Certificates.Count == 0) {
            throw 'Не найдено ни одного действующего сертификата для электронной цифровой подписи.';
        }

        try {
            var certificates = this.store.Certificates.Find(CAPICOM_CERTIFICATE_FIND_TIME_VALID);
            var result = [];
            for (var i = 1; i <= certificates.Count; i++) {
                result.push(certificates.Item(i));
            }
            return result;
        } catch (e) {
            error(e);
        }
        return false;
    };

    /**
     * Получает сертификат по его хешу.
     * @param {string} thumbprint
     */
    function _getCertificateByThumbprint(thumbprint)
    {
        var certificate = instance.store.Certificates.Find(CAPICOM_CERTIFICATE_FIND_SHA1_HASH, thumbprint);

        console.log('get');
        console.log(certificate);

        if (certificate.Count > 0) {
            return certificate.Item(1);
        } else {
            throw 'Не найден сертификат пользователя';
        }
    }

    /**
     *
     * @param data
     * @param certificateThumbprint
     * @param time
     * @return {*}
     *
     * @private
     */
     function _sign(data, certificateThumbprint, time)
     {
        if (!data)                      throw 'data is not set';
        if (!certificateThumbprint)     throw 'certificateThumbprint is not set';

        var today           = new Date(time),

            SignedData      = new ActiveXObject("CAPICOM.SignedData"),
            Signer          = new ActiveXObject("CAPICOM.Signer"),
            TimeAttribute   = new ActiveXObject("CAPICOM.Attribute");

        var certificate     = _getCertificateByThumbprint(certificateThumbprint);

        console.log('sign');
        console.log(certificate);

        SignedData.Content = data;
        Signer.Certificate = certificate;

        TimeAttribute.Name = CAPICOM_AUTHENTICATED_ATTRIBUTE_SIGNING_TIME;
        TimeAttribute.Value = today.getVarDate();

        Signer.AuthenticatedAttributes.Add(TimeAttribute);


        return SignedData.Sign(Signer, true, CAPICOM_ENCODE_BASE64);
    }

    /**
     * Подписы
     * @param time
     * @param data
     * @param certificateThumbprint
     */
    this.sign = function(data, certificateThumbprint, time)
    {
        try {
            return _sign(data, certificateThumbprint, time);
        } catch(e) {

            if (e.number) {
                switch (e.number) {
                    case -2146827859:
                        error('Ваш браузер не поддерживает работу с ActiveX объектами. Либо не установлен объект Capicom.');
                        break;
                    case CAPICOM_E_SIGNER_INVALID_USAGE:
                        error('Сертификат не действителен для подписания.');
                        break;
                    default:
                        error('Ошибка при подписании данных: ' + e.description);
                        break;
                }
            } else {
                error(e);
            }
        }
        return false;
    };

//    this.checkSignCapicom = function(data, signedData, noSha1)
//    {
//        try {
//            var SignedData  = new ActiveXObject("CAPICOM.SignedData");
//            var certificate = null;
//            var infoText    = {};
//            var date        = null;
//
//            if (noSha1) {
//                data = sha1(data);
//            }
//
//            // устанавливаем контент для проверки подписи.
//            SignedData.Content = data;
//
//            // проверяем подпись.
//            SignedData.Verify(signedData, true, CAPICOM_VERIFY_SIGNATURE_AND_CERTIFICATE);
//
//            // если проверка прошла успешно, то выбираем из подписи сертификат, которым подписывались данные.
//            certificate = SignedData.Signers.Item(1).Certificate;
//
//            // получаем данные сертификата.
//            certificateInfo = this.getCertificateInfo(certificate, false);
//
//            date            = new Date(certificateInfo['ValidToDate']);
//
//            alertCapicom('<div style="margin-top: -85px;">Проверка подписи прошла успешно.<br/><br/>' +
//                'Владелец сертификата: ' + certificateInfo.user['name'] +'.<br>' +
//                'Организация: ' + certificateInfo.user['organisation'] + '.<br/>' +
//                'Сертификат выдан: ' + certificateInfo.user['certificateName'] + '.<br/>' +
//                'Сертификат действителен до: ' + date.toLocaleDateString() + '</div>', 'Проверка подписи', 600, 250);
//        } catch (e) {
//            return this.errorHandler(e.description);
//        }
//    };

    init();

    return instance;
}