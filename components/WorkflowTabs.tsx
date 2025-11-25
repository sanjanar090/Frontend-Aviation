"use client";

import React from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

import WorkflowTable from "./WorkflowTable";
import MyWorkflowSteps from "./MyWorkflowSteps";
import ManagementOfChange from "./ManagementOfChange";
import WorkflowsPage from "./WorkflowsPage";   // <-- THE BIG FULL LAYOUT WORKFLOW PAGE

const ActionsPage = () => <div className="p-6">Actions content</div>;

export const WorkflowTabsPage: React.FC = () => {
  return (
    <div className="bg-card px-6 py-3">
      <Tabs defaultValue="dashboard" className="w-full">
        
        {/* ---------------- TAB HEADERS ---------------- */}
        <TabsList className="bg-transparent h-auto p-0 gap-2">

          <TabsTrigger
            value="dashboard"
            className="data-[state=active]:bg-transparent 
                       data-[state=active]:border-b-2 
                       data-[state=active]:border-primary 
                       rounded-none px-4 py-2"
          >
            Dashboard
          </TabsTrigger>

          <TabsTrigger
            value="my-steps"
            className="data-[state=active]:bg-primary 
                       data-[state=active]:text-primary-foreground 
                       rounded px-4 py-2 flex items-center gap-2"
          >
            My workflow steps
            <Badge variant="secondary" className="ml-1 bg-white text-primary">
              5
            </Badge>
          </TabsTrigger>

          <TabsTrigger
            value="management"
            className="data-[state=active]:bg-transparent 
                       data-[state=active]:border-b-2 
                       data-[state=active]:border-primary 
                       rounded-none px-4 py-2"
          >
            Management of change
          </TabsTrigger>

          <TabsTrigger
            value="workflows"
            className="data-[state=active]:bg-transparent 
                       data-[state=active]:border-b-2 
                       data-[state=active]:border-primary 
                       rounded-none px-4 py-2"
          >
            Workflows
          </TabsTrigger>

          <TabsTrigger
            value="actions"
            className="data-[state=active]:bg-transparent 
                       data-[state=active]:border-b-2 
                       data-[state=active]:border-primary 
                       rounded-none px-4 py-2 flex items-center gap-2"
          >
            Actions
            <Badge variant="secondary" className="ml-1">20</Badge>
          </TabsTrigger>
        </TabsList>

        {/* ---------------- TAB CONTENT ---------------- */}

        <TabsContent value="dashboard" className="mt-6">
          <WorkflowTable />
        </TabsContent>

        <TabsContent value="my-steps" className="mt-6">
          <MyWorkflowSteps />
        </TabsContent>

        <TabsContent value="management" className="mt-6">
          <ManagementOfChange />
        </TabsContent>

        {/* ---------------- FULL WORKFLOWS PAGE ---------------- */}
        <TabsContent value="workflows" className="mt-6">
          <WorkflowsPage />   {/* <-- YOUR BIG PAGE INSERTED HERE */}
        </TabsContent>

        <TabsContent value="actions" className="mt-6">
          <ActionsPage />
        </TabsContent>

      </Tabs>
    </div>
  );
};

export default WorkflowTabsPage;
