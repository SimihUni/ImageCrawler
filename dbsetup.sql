CREATE SEQUENCE images_id_seq INCREMENT 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1;

CREATE TABLE "public"."images" (
    "id" integer DEFAULT nextval('images_id_seq') NOT NULL,
    "url_id" integer NOT NULL,
    "imageCount" integer DEFAULT 0 NOT NULL,
    "timestamp" timestamp DEFAULT NOW() NOT NULL,
    CONSTRAINT "images_pkey" PRIMARY KEY ("id")
)
WITH (oids = false);


CREATE SEQUENCE urls_id_seq INCREMENT 1 MINVALUE 1 MAXVALUE 9223372036854775807 CACHE 1;

CREATE TABLE "public"."urls" (
    "id" integer DEFAULT nextval('urls_id_seq') NOT NULL,
    "blackList" boolean DEFAULT false NOT NULL,
    "blackDate" timestamp DEFAULT NOW() NOT NULL,
    "active" boolean DEFAULT true NOT NULL,
    "url" text NOT NULL,
    CONSTRAINT "urls_id" PRIMARY KEY ("id")
    UNIQUE ("url")
)
WITH (oids = false);
