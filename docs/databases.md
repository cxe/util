# Databases

## Databases (2025)

### Relational Databases
- [PostgreSQL](https://www.postgresql.org/) – Advanced open-source relational DB with strong SQL compliance.
- [MySQL](https://www.mysql.com/) – Widely-used open-source RDBMS, especially for web applications.
- [MariaDB](https://mariadb.org/) – Community-developed MySQL fork with enterprise features.
- [Oracle Database](https://www.oracle.com/database/) – Enterprise-grade RDBMS with extensive features.
- [Microsoft SQL Server](https://www.microsoft.com/en-us/sql-server) – Enterprise RDBMS with tight Windows integration.
- [SQLite](https://sqlite.org/) – Lightweight, embedded SQL database engine.
- [CockroachDB](https://www.cockroachlabs.com/) – Cloud-native distributed SQL database.
- [Amazon Aurora](https://aws.amazon.com/rds/aurora/) – Fully managed relational DB compatible with MySQL/PostgreSQL.
- [Google Cloud Spanner](https://cloud.google.com/spanner) – Globally-distributed SQL database with strong consistency.
- [TiDB](https://pingcap.com/) – Hybrid transactional/analytical database (HTAP) compatible with MySQL.

### NoSQL Databases
- [MongoDB](https://www.mongodb.com/) – Document-oriented database known for developer-friendly JSON storage.
- [Couchbase](https://www.couchbase.com/) – Distributed NoSQL document database with SQL-like querying.
- [Amazon DynamoDB](https://aws.amazon.com/dynamodb/) – Fully managed key-value and document database service.
- [Redis](https://redis.io/) – In-memory data structure store, often used as a cache or key-value store.
- [RethinkDB](https://rethinkdb.com/) – Real-time JSON database for modern apps.
- [RavenDB](https://ravendb.net/) – Fully transactional NoSQL document database.
- [ArangoDB](https://www.arangodb.com/) – Multi-model database supporting document, key-value, and graph.

### Graph Databases
- [Neo4j](https://neo4j.com/) – Leading native graph database with Cypher query language.
- [Amazon Neptune](https://aws.amazon.com/neptune/) – Fully managed graph database with support for Gremlin and SPARQL.
- [Dgraph](https://dgraph.io/) – High-performance distributed graph database.
- [OrientDB](https://orientdb.org/) – Multi-model DB combining graph and document models.
- [JanusGraph](https://janusgraph.org/) – Scalable graph database optimized for storing large graphs.

### Time-Series Databases
- [InfluxDB](https://www.influxdata.com/) – High-performance time-series database for real-time analytics.
- [TimescaleDB](https://www.timescale.com/) – PostgreSQL-based time-series database.
- [Prometheus](https://prometheus.io/) – Monitoring system and time-series database.
- [QuestDB](https://questdb.io/) – Fast SQL-based time-series database.

### Object-Oriented / Specialized
- [db4o](https://github.com/db4o/db4o) – Java and .NET object-oriented database (no longer actively maintained).
- [ZODB](https://zodb.org/) – Native object database for Python.
- [Berkeley DB](https://www.oracle.com/database/technologies/related/berkeleydb.html) – High-performance embedded DB.
- [ObjectDB](https://www.objectdb.com/) – Java-based object database with JPA/JDO support.

### Vector / Embedding Databases
- [Pinecone](https://www.pinecone.io/) – Vector database for AI, optimized for similarity search.
- [Weaviate](https://weaviate.io/) – Open-source vector search engine with semantic search and hybrid querying.
- [Milvus](https://milvus.io/) – Scalable vector database for embedding similarity search.
- [Qdrant](https://qdrant.tech/) – Vector database with support for filtering, metadata, and search.

### Full-text Search / Semantic
- [Typesense](https://typesense.org/) – Fast, typo-tolerant search engine.
- [MeiliSearch](https://www.meilisearch.com/) – Lightning-fast, open-source, search engine for modern apps.
- [OpenSearch](https://opensearch.org/) – Fork of Elasticsearch; distributed search and analytics engine.

### Blockchain / Immutable
- [BigchainDB](https://www.bigchaindb.com/) – Database with blockchain characteristics.
- [Fluree](https://flur.ee/) – Semantic graph database with blockchain-style immutability.

### Streaming / Event Sourced
- [EventStoreDB](https://eventstore.com/) – Event-sourced DB storing immutable event logs.
- [Materialize](https://materialize.com/) – Streaming SQL engine for real-time data views.


## Key Facts About Databases
- **Relational Databases (RDBMS)** use structured schemas and SQL for transactions and queries.
- **NoSQL** databases include document, key-value, wide-column, and graph types, offering flexibility and scale.
- **Graph databases** are optimized for highly connected data and support traversals (e.g., social graphs).
- **Time-series databases** are specialized for timestamped data, often used in monitoring and IoT.
- **Object-oriented databases** allow storing objects directly, aligning with OOP principles.
- **SQL vs. NoSQL** is not a battle—many modern systems blur the lines or support hybrid models.
- **ACID vs. BASE**: RDBMS often follow ACID (strong consistency), while NoSQL systems favor BASE (eventual consistency).
- **CAP Theorem**: No distributed database can simultaneously guarantee Consistency, Availability, and Partition Tolerance.
- **NewSQL** systems (e.g., CockroachDB, TiDB, Spanner) aim to bring SQL features to scalable, distributed systems.
- **Cloud-native databases** like Aurora, Spanner, and Cosmos DB are designed for elasticity and global distribution.
