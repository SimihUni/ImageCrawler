CREATE TABLE "images" (
    "id" BIGSERIAL PRIMARY KEY,
    "url_id" integer NOT NULL,
    "imageCount" integer DEFAULT 0 NOT NULL,
    "timestamp" timestamp DEFAULT NOW() NOT NULL
)
WITH (oids = false);

CREATE TABLE "urls" (
    "id" BIGSERIAL PRIMARY KEY,
    "blackList" boolean DEFAULT false NOT NULL,
    "blackListDate" timestamp DEFAULT NOW() NOT NULL,
    "active" boolean DEFAULT true NOT NULL,
    "url" text NOT NULL
)
WITH (oids = false);

ALTER TABLE "urls" ADD UNIQUE ("url");
