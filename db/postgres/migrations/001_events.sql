
CREATE TABLE events (
  event_id UUID PRIMARY KEY,
  intent_id UUID NOT NULL,
  engine TEXT,
  event_type TEXT,
  payload JSONB,
  hash TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);
