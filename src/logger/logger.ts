import { LoggerModule, NgxLoggerLevel } from 'ngx-logger';

const { DEBUG, OFF } = NgxLoggerLevel;

export const Logger = LoggerModule.forRoot({
  level: DEBUG,
  serverLogLevel: OFF,
});
