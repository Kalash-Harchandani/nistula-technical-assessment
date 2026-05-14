
-- Guests Table
-- One unified guest profile across all channels

CREATE TABLE guests (

    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    full_name VARCHAR(255) NOT NULL,

    email VARCHAR(255),

    phone_number VARCHAR(20),

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP

);

-- Properties Table
-- Stores villa/property information

CREATE TABLE properties (

    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    property_code VARCHAR(100) UNIQUE NOT NULL,

    property_name VARCHAR(255) NOT NULL,

    location VARCHAR(255),

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP

);

-- Reservations Table
-- Links guests to property bookings

CREATE TABLE reservations (

    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    booking_reference VARCHAR(100) UNIQUE NOT NULL,

    guest_id UUID REFERENCES guests(id),

    property_id UUID REFERENCES properties(id),

    check_in_date DATE,

    check_out_date DATE,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP

);

-- Conversations Table
-- Groups messages into communication threads

CREATE TABLE conversations (

    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    guest_id UUID REFERENCES guests(id),

    reservation_id UUID REFERENCES reservations(id),

    source_channel VARCHAR(50) NOT NULL,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP

);

-- Messages Table
-- Stores all inbound and outbound messages

CREATE TABLE messages (

    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    conversation_id UUID REFERENCES conversations(id),

    sender_type VARCHAR(50) NOT NULL,

    message_text TEXT NOT NULL,

    query_type VARCHAR(100),

    ai_drafted BOOLEAN DEFAULT FALSE,

    auto_sent BOOLEAN DEFAULT FALSE,

    confidence_score DECIMAL(3,2),

    action_type VARCHAR(50),

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP

);


-- Indexes for faster query performance


CREATE INDEX idx_messages_query_type
ON messages(query_type);

CREATE INDEX idx_messages_created_at
ON messages(created_at);

CREATE INDEX idx_reservations_booking_reference
ON reservations(booking_reference);


-- Design Notes


-- 1. Guests are separated from reservations to support
-- repeat customers across multiple stays and channels.

-- 2. Conversations act as communication threads linking
-- messages together for contextual history.

-- 3. Messages table stores AI metadata such as:
--    - confidence_score
--    - ai_drafted
--    - auto_sent
--    - query_type

-- 4. UUIDs are used for scalability and distributed systems.

-- 5. Indexes were added on high-frequency lookup fields
-- for faster filtering and analytics.



-- Hardest Design Decision


-- The most challenging design decision was separating
-- conversations from messages while still maintaining
-- relationships between guests, reservations, and channels.

-- This separation was chosen because a guest may send
-- multiple messages across different platforms during the
-- same reservation lifecycle. Using a conversations table
-- allows future scalability for threaded communication,
-- analytics, escalation tracking, and multi-agent support.