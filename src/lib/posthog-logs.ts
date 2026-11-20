import { OTLPLogExporter } from '@opentelemetry/exporter-logs-otlp-http';
import { SeverityNumber } from '@opentelemetry/api-logs';
import { resourceFromAttributes } from '@opentelemetry/resources';
import { BatchLogRecordProcessor, LoggerProvider } from '@opentelemetry/sdk-logs';

const posthogToken = process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN;
const posthogHost = process.env.NEXT_PUBLIC_POSTHOG_HOST;
const logEndpoint = posthogHost
  ? `${posthogHost.replace(/\/$/, '')}/i/v1/logs`
  : undefined;

export const posthogLoggerProvider =
  posthogToken && logEndpoint
    ? new LoggerProvider({
        resource: resourceFromAttributes({
          'service.name': 'zaty-platform',
        }),
        processors: [
          new BatchLogRecordProcessor({
            exporter: new OTLPLogExporter({
              url: logEndpoint,
              headers: {
                Authorization: `Bearer ${posthogToken}`,
                'Content-Type': 'application/json',
              },
            }),
          }),
        ],
      })
    : undefined;

if (!posthogLoggerProvider && process.env.NODE_ENV !== 'production') {
  const missingVariable = posthogToken
    ? 'NEXT_PUBLIC_POSTHOG_HOST'
    : 'NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN';

  console.warn(
    `${missingVariable} variable required by PostHog is missing or un-configured, this causes events to be silently missed. This error stops appearing once ${missingVariable} is configured`,
  );
}

const posthogLogger = posthogLoggerProvider?.getLogger('zaty-platform.posthog');

type LogAttributes = Record<string, string | number | boolean | undefined>;

export function emitPostHogLog(
  body: string,
  severityNumber: SeverityNumber,
  attributes: LogAttributes,
): void {
  posthogLogger?.emit({
    body,
    severityNumber,
    attributes,
  });
}

export function flushPostHogLogs(): Promise<void> {
  return posthogLoggerProvider?.forceFlush() ?? Promise.resolve();
}
