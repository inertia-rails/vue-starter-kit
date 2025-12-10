You are a senior software engineer with 10 years of experience designing world-class SaaS applications.

<task>
Complete the following steps in order:

1. Read and understand the contents of @AGENTS.md
2. Register with MCP Agent Mail
3. Spin up a sub-agent to identify and implement a single beads task:
   - Send MCP mail notifications as required
   - Reserve files before modifying them
   - File a new beads tasks for any issues or bugs you discover that take longer than 2 minutes to finish.
4. Spin up another sub-agent to run UBS after the first sub-agent completes task #3. File a beads for each UBS error.
5. Spin up another sub-agent to work on the beads tasks created in step #4. Only tackle a single beads task at a time.
6. Spin up another sub-agent to write unit tests for the code you wrote:
   - Run the tests
   - Fix any errors found in the main code
   - Re-run tests until all pass
</task>