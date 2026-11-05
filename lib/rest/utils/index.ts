import { OpenAPIGenerator } from "@orpc/openapi";
import { ZodToJsonSchemaConverter } from "@orpc/zod";

import {
  APP_OPENAPI_INFO,
  API_PATH_PREFIXES,
} from "~/lib/rest/config/constants";

export const openAPIGenerator = new OpenAPIGenerator({
  schemaConverters: [new ZodToJsonSchemaConverter()],
});

export const createHTMLScalarJSONDoc = () =>
  `
				<!doctype html>
				<html>
						<head>
								<title>${APP_OPENAPI_INFO.REST.title}</title>
								<meta charset="utf-8" />
								<meta name="viewport" content="width=device-width, initial-scale=1" />
								<link rel="icon" type="image/svg+xml" href="https://orpc.unnoq.com/icon.svg" />
						</head>
						<body>
								<script id="api-reference" data-url="${API_PATH_PREFIXES.REST_DOCS_JSON}"></script>
								<script src="https://cdn.jsdelivr.net/npm/@scalar/api-reference"></script>
						</body>
				</html>
		`;
