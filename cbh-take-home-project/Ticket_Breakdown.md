# Ticket Breakdown

We are a staffing company whose primary purpose is to book Agents at Shifts posted by Facilities on our platform. We're working on a new feature which will generate reports for our client Facilities containing info on how many hours each Agent worked in a given quarter by summing up every Shift they worked. Currently, this is how the process works:

- Data is saved in the database in the Facilities, Agents, and Shifts tables
- A function `getShiftsByFacility` is called with the Facility's id, returning all Shifts worked that quarter, including some metadata about the Agent assigned to each
- A function `generateReport` is then called with the list of Shifts. It converts them into a PDF which can be submitted by the Facility for compliance.

## You've been asked to work on a ticket. It reads:

**Currently, the id of each Agent on the reports we generate is their internal database id. We'd like to add the ability for Facilities to save their own custom ids for each Agent they work with and use that id when generating reports for them.**

Based on the information given, break this ticket down into 2-5 individual tickets to perform. Provide as much detail for each ticket as you can, including acceptance criteria, time/effort estimates, and implementation details. Feel free to make informed guesses about any unknown details - you can't guess "wrong".

You will be graded on the level of detail in each ticket, the clarity of the execution plan within and between tickets, and the intelligibility of your language. You don't need to be a native English speaker, but please proof-read your work.

## Your Breakdown Here

## Ticket 1: Add a custom_id field to the Agents table

- Acceptance Criteria:A new column `custom_id` is added to the Agents table
- The `custom_id` field is nullable and unique per Facility
- Existing Agents in the database are assigned a null `custom_id`

Time/Effort estimate: 2-3 hours

- Implementation details:Add a new migration file to add the `custom_id` field to the Agents table
- Write a script to populate existing Agents with null `custom_id` values
- Add validation to the API and database layer to ensure uniqueness of `custom_id` per Facility

## Ticket 2: Allow Facilities to set custom ids for Agents they work with

- Acceptance Criteria:A new API endpoint is created that allows Facilities to update the `custom_id` of an Agent
- The endpoint should only allow Facilities to update `custom_id` for Agents associated with their Facility
- If an Agent with the specified `custom_id` already exists for the Facility, the update should fail with an appropriate error message

Time/Effort estimate: 3-5 hours

- Implementation details:Add a new API endpoint to update the `custom_id` field for an Agent
- Implement authorization logic to ensure that Facilities can only update `custom_id` for Agents associated with their Facility
- Write unit tests to verify the functionality of the endpoint

## Ticket 3: Use custom ids in generated reports

- Acceptance Criteria:The `generateReport` function is updated to use the `custom_id` field instead of the internal database id when generating reports for a Facility
- If a Shift does not have a `custom_id` associated with it, the internal database id should be used instead

Time/Effort estimate: 1-2 hours

- Implementation details:Update the `generateReport` function to use the `custom_id` field instead of the internal database id when available
- Add a fallback mechanism to use the internal database id if a Shift does not have a `custom_id` associated with it
- Write unit tests to verify the functionality of the updated `generateReport` function
