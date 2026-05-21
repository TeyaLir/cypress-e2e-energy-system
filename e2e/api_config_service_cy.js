import { config_root } from '../../support/project-urls';

describe('Тестирование сервиса конфигурации API', () => {

  it('GET / — базовая проверка сервиса', () => {
    cy.request(config_root).as('req_root');
    cy.get('@req_root').should((response) => {
      expect(response).to.have.property('status', 200);
      expect(response.body).to.property('result', true);
      expect(response.body).to.property('package_app_name', 'demo-config');
      expect(response.body).to.property('app_run_on_port', 3000);
    });
  });

  it('GET /now — проверка доступности сервиса', () => {
    cy.request(`${config_root}/now`).as('req_root');
    cy.get('@req_root').should((response) => {
      expect(response).to.have.property('status', 200);
      expect(response.body).to.property('result', true);
      expect(response.body).to.property('package_app_name', 'demo-config');
      expect(response.body).to.property('app_run_on_port', 3000);
    });
  });

  it('GET /pg-now — проверка подключения к базе данных', () => {
    cy.request(`${config_root}/pg-now`).as('req_root');
    cy.get('@req_root').should((response) => {
      expect(response).to.have.property('status', 200);
      expect(response.body).to.property('result', true);
      expect(response.body).to.property('package_app_name', 'demo-config');
      expect(response.body).to.property('app_run_on_port', 3000);
      expect(response.body).to.property('dbhost', 'demo-db-host');
      expect(response.body).to.property('dbname', 'config');
      expect(response.body).to.property('dbuser', 'demo_user');
    });
  });

  it('GET /get_app_config — конфигурация сервиса адресов', () => {
    cy.request(`${config_root}/get_app_config?app_name=demo-address`).as('req_root');
    cy.get('@req_root').should((response) => {
      expect(response).to.have.property('status', 200);
      expect(response.body).to.property('result', true);
      expect(response.body).to.property('config');
      expect(response.body.config).to.property('url', 'demo-address');
      expect(response.body.config).to.property('port', 3116);
      expect(response.body.config).to.property('database');
      expect(response.body.config.database).to.property('host', 'demo-db-host');
      expect(response.body.config.database).to.property('port', '5432');
      expect(response.body.config.database).to.property('name', 'demo');
    });
  });

  it('GET /get_app_config — конфигурация сервиса администрирования', () => {
    cy.request(`${config_root}/get_app_config?app_name=demo-admin`).as('req_root');
    cy.get('@req_root').should((response) => {
      expect(response).to.have.property('status', 200);
      expect(response.body).to.property('result', true);
      expect(response.body).to.property('config');
      expect(response.body.config).to.property('url', 'demo-admin');
      expect(response.body.config).to.property('port', 3102);
      expect(response.body.config).to.property('database');
      expect(response.body.config.database).to.property('host', 'demo-db-host');
      expect(response.body.config.database).to.property('port', '5432');
      expect(response.body.config.database).to.property('name', 'demo');
    });
  });

  it('GET /get_app_config — конфигурация API-шлюза', () => {
    cy.request(`${config_root}/get_app_config?app_name=demo-api-gateway`).as('req_root');
    cy.get('@req_root').should((response) => {
      expect(response).to.have.property('status', 200);
      expect(response.body).to.property('result', true);
      expect(response.body).to.property('config');
      expect(response.body.config).to.property('url', 'demo-api-gateway');
      expect(response.body.config).to.property('port', 3100);
      expect(response.body.config).to.property('services');
      expect(response.body.config.services).to.property('auth', 'demo-auth');
      expect(response.body.config.services).to.property('meta', 'demo-meta');
      expect(response.body.config.services).to.property('userdata', 'demo-user-data');
    });
  });

  it('GET /get_app_config — конфигурация сервиса аутентификации', () => {
    cy.request(`${config_root}/get_app_config?app_name=demo-auth`).as('req_root');
    cy.get('@req_root').should((response) => {
      expect(response).to.have.property('status', 200);
      expect(response.body).to.property('result', true);
      expect(response.body).to.property('config');
      expect(response.body.config).to.property('url', 'demo-auth');
      expect(response.body.config).to.property('port', 3101);
      expect(response.body.config).to.property('database');
      expect(response.body.config.database).to.property('host', 'demo-db-host');
      expect(response.body.config.database).to.property('port', '5432');
      expect(response.body.config.database).to.property('name', 'auth');
    });
  });

  it('GET /get_app_config — конфигурация основного сервиса', () => {
    cy.request(`${config_root}/get_app_config?app_name=demo-core`).as('req_root');
    cy.get('@req_root').should((response) => {
      expect(response).to.have.property('status', 200);
      expect(response.body).to.property('result', true);
      expect(response.body).to.property('config');
      expect(response.body.config).to.property('url', 'demo-core');
      expect(response.body.config).to.property('port', 3117);
      expect(response.body.config).to.property('database');
      expect(response.body.config.database).to.property('host', 'demo-db-host');
      expect(response.body.config.database).to.property('port', '5432');
      expect(response.body.config.database).to.property('name', 'demo');
    });
  });

  it('GET /get_app_config — конфигурация сервиса контрагентов', () => {
    cy.request(`${config_root}/get_app_config?app_name=demo-counteragent`).as('req_root');
    cy.get('@req_root').should((response) => {
      expect(response).to.have.property('status', 200);
      expect(response.body).to.property('result', true);
      expect(response.body).to.property('config');
      expect(response.body.config).to.property('url', 'demo-counteragent');
      expect(response.body.config).to.property('port', 3104);
      expect(response.body.config).to.property('database');
      expect(response.body.config.database).to.property('host', 'demo-db-host');
      expect(response.body.config.database).to.property('port', '5432');
      expect(response.body.config.database).to.property('name', 'demo');
    });
  });

  it('GET /get_app_config — конфигурация сервиса баз данных', () => {
    cy.request(`${config_root}/get_app_config?app_name=demo-databases`).as('req_root');
    cy.get('@req_root').should((response) => {
      expect(response).to.have.property('status', 200);
      expect(response.body).to.property('result', true);
      expect(response.body).to.property('config');
      expect(response.body.config).to.property('url', 'demo-databases');
      expect(response.body.config).to.property('port', 3115);
      expect(response.body.config).to.property('database');
      expect(response.body.config.database).to.property('host', 'demo-db-host');
      expect(response.body.config.database).to.property('port', '5432');
      expect(response.body.config.database).to.property('name', 'databases');
    });
  });

  it('GET /get_app_config — конфигурация демо-сервиса', () => {
    cy.request(`${config_root}/get_app_config?app_name=demo-app`).as('req_root');
    cy.get('@req_root').should((response) => {
      expect(response).to.have.property('status', 200);
      expect(response.body).to.property('result', true);
      expect(response.body).to.property('config');
      expect(response.body.config).to.property('url', 'demo-app');
      expect(response.body.config).to.property('port', 3109);
      expect(response.body.config).to.property('database');
      expect(response.body.config.database).to.property('host', 'demo-db-host');
      expect(response.body.config.database).to.property('port', '5432');
      expect(response.body.config.database).to.property('name', 'demo');
    });
  });

  it('GET /get_app_config — конфигурация сервиса энергосети', () => {
    cy.request(`${config_root}/get_app_config?app_name=demo-e-grid`).as('req_root');
    cy.get('@req_root').should((response) => {
      expect(response).to.have.property('status', 200);
      expect(response.body).to.property('result', true);
      expect(response.body).to.property('config');
      expect(response.body.config).to.property('url', 'demo-e-grid');
      expect(response.body.config).to.property('port', 3114);
      expect(response.body.config).to.property('database');
      expect(response.body.config.database).to.property('host', 'demo-db-host');
      expect(response.body.config.database).to.property('port', '5432');
      expect(response.body.config.database).to.property('name', 'demo');
    });
  });

  it('GET /get_app_config — конфигурация сервиса хранения файлов', () => {
    cy.request(`${config_root}/get_app_config?app_name=demo-file-storage`).as('req_root');
    cy.get('@req_root').should((response) => {
      expect(response).to.have.property('status', 200);
      expect(response.body).to.property('result', true);
      expect(response.body).to.property('config');
      expect(response.body.config).to.property('url', 'demo-file-storage');
      expect(response.body.config).to.property('port', 3105);
      expect(response.body.config).to.property('database');
      expect(response.body.config.database).to.property('host', 'demo-db-host');
      expect(response.body.config.database).to.property('port', '5432');
      expect(response.body.config.database).to.property('name', 'filestorage');
    });
  });

  it('GET /get_app_config — конфигурация сервиса метаданных', () => {
    cy.request(`${config_root}/get_app_config?app_name=demo-meta`).as('req_root');
    cy.get('@req_root').should((response) => {
      expect(response).to.have.property('status', 200);
      expect(response.body).to.property('result', true);
      expect(response.body).to.property('config');
      expect(response.body.config).to.property('url', 'demo-meta');
      expect(response.body.config).to.property('port', 3107);
      expect(response.body.config).to.property('database');
      expect(response.body.config.database).to.property('host', 'demo-db-host');
      expect(response.body.config.database).to.property('port', '5432');
      expect(response.body.config.database).to.property('name', 'demo');
    });
  });

  it('GET /get_app_config — конфигурация сервиса уведомлений', () => {
    cy.request(`${config_root}/get_app_config?app_name=demo-notify`).as('req_root');
    cy.get('@req_root').should((response) => {
      expect(response).to.have.property('status', 200);
      expect(response.body).to.property('result', true);
      expect(response.body).to.property('config');
      expect(response.body.config).to.property('url', 'demo-notify');
      expect(response.body.config).to.property('port', 3103);
      expect(response.body.config).to.property('database');
      expect(response.body.config.database).to.property('host', 'demo-db-host');
      expect(response.body.config.database).to.property('port', '5432');
      expect(response.body.config.database).to.property('name', 'notify');
    });
  });

  it('GET /get_app_config — конфигурация сервиса пользовательских данных', () => {
    cy.request(`${config_root}/get_app_config?app_name=demo-user-data`).as('req_root');
    cy.get('@req_root').should((response) => {
      expect(response).to.have.property('status', 200);
      expect(response.body).to.property('result', true);
      expect(response.body).to.property('config');
      expect(response.body.config).to.property('url', 'demo-user-data');
      expect(response.body.config).to.property('port', 3108);
      expect(response.body.config).to.property('database');
      expect(response.body.config.database).to.property('host', 'demo-db-host');
      expect(response.body.config.database).to.property('port', '5432');
      expect(response.body.config.database).to.property('name', 'userdata');
    });
  });

  it('GET /get_all_configs — получение всех конфигураций', () => {
    cy.request(`${config_root}/get_all_configs`).as('req_root');
    cy.get('@req_root').should((response) => {
      expect(response).to.have.property('status', 200);
      expect(response.body).to.property('demo-auth');
      expect(response.body).to.property('demo-api-gateway');
      expect(response.body).to.property('ver');
    });
  });

});