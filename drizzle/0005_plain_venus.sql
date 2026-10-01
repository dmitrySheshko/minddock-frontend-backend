CREATE TABLE "message_sources" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"message_id" uuid NOT NULL,
	"document_id" uuid,
	"chunk_id" uuid,
	"document_name" text NOT NULL,
	"chunk_index" integer NOT NULL,
	"content" text NOT NULL,
	"similarity" real NOT NULL
);
--> statement-breakpoint
ALTER TABLE "message_sources" ADD CONSTRAINT "message_sources_message_id_messages_id_fk" FOREIGN KEY ("message_id") REFERENCES "public"."messages"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "message_sources" ADD CONSTRAINT "message_sources_document_id_documents_id_fk" FOREIGN KEY ("document_id") REFERENCES "public"."documents"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "message_sources" ADD CONSTRAINT "message_sources_chunk_id_document_chunks_id_fk" FOREIGN KEY ("chunk_id") REFERENCES "public"."document_chunks"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "message_sources_message_id_idx" ON "message_sources" USING btree ("message_id");