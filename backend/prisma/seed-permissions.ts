// prisma/seed-permissions.ts
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding permissions...')

  const permissions = [
    // Organization & User Management
    { 
      name: 'manage_organization', 
      displayName: 'Manage Organization',
      description: 'View and update organization settings.',
      category: 'Organization & User Management'
    },
    { 
      name: 'transfer_ownership', 
      displayName: 'Transfer Ownership',
      description: 'Transfer ownership of the organization to another user.',
      category: 'Organization & User Management'
    },
    { 
      name: 'deactivate_organization', 
      displayName: 'Deactivate Organization',
      description: 'Deactivate or delete the organization.',
      category: 'Organization & User Management'
    },
    { 
      name: 'manage_roles', 
      displayName: 'Manage Roles',
      description: 'Create, update, and delete custom roles and their permissions.',
      category: 'Organization & User Management'
    },
    { 
      name: 'assign_roles', 
      displayName: 'Assign Roles',
      description: 'Assign or change a user\'s role within the organization.',
      category: 'Organization & User Management'
    },
    { 
      name: 'manage_users', 
      displayName: 'Manage Users',
      description: 'Invite, deactivate, and delete users.',
      category: 'Organization & User Management'
    },
    { 
      name: 'view_users', 
      displayName: 'View Users',
      description: 'View the list of users and their profiles.',
      category: 'Organization & User Management'
    },

    // Project Management
    { 
      name: 'view_all_projects', 
      displayName: 'View All Projects',
      description: 'View all projects within the organization.',
      category: 'Project Management'
    },
    { 
      name: 'create_project', 
      displayName: 'Create Project',
      description: 'Create new projects.',
      category: 'Project Management'
    },
    { 
      name: 'edit_project', 
      displayName: 'Edit Project',
      description: 'Edit project details.',
      category: 'Project Management'
    },
    { 
      name: 'archive_project', 
      displayName: 'Archive Project',
      description: 'Archive a project.',
      category: 'Project Management'
    },
    { 
      name: 'delete_project', 
      displayName: 'Delete Project',
      description: 'Permanently delete a project.',
      category: 'Project Management'
    },
    { 
      name: 'manage_project_members', 
      displayName: 'Manage Project Members',
      description: 'Add, remove, or change the role of project members.',
      category: 'Project Management'
    },
    { 
      name: 'manage_project_settings', 
      displayName: 'Manage Project Settings',
      description: 'Manage project-specific settings.',
      category: 'Project Management'
    },

    // Task Management
    { 
      name: 'view_all_tasks', 
      displayName: 'View All Tasks',
      description: 'View all tasks within the organization.',
      category: 'Task Management'
    },
    { 
      name: 'create_task', 
      displayName: 'Create Task',
      description: 'Create new tasks.',
      category: 'Task Management'
    },
    { 
      name: 'assign_task', 
      displayName: 'Assign Task',
      description: 'Assign a task to any user.',
      category: 'Task Management'
    },
    { 
      name: 'update_task_details', 
      displayName: 'Update Task Details',
      description: 'Edit task title, description, due dates, etc.',
      category: 'Task Management'
    },
    { 
      name: 'update_task_status', 
      displayName: 'Update Task Status',
      description: 'Change the status of any task.',
      category: 'Task Management'
    },
    { 
      name: 'update_task_priority', 
      displayName: 'Update Task Priority',
      description: 'Change the priority of any task.',
      category: 'Task Management'
    },
    { 
      name: 'delete_task', 
      displayName: 'Delete Task',
      description: 'Delete any task.',
      category: 'Task Management'
    },
    { 
      name: 'manage_labels', 
      displayName: 'Manage Labels',
      description: 'Create, edit, and delete task labels.',
      category: 'Task Management'
    },

    // Collaboration & Communication
    { 
      name: 'add_comments', 
      displayName: 'Add Comments',
      description: 'Add comments to any task.',
      category: 'Collaboration & Communication'
    },
    { 
      name: 'update_comments', 
      displayName: 'Update Comments',
      description: 'Edit their own comments.',
      category: 'Collaboration & Communication'
    },
    { 
      name: 'delete_comments', 
      displayName: 'Delete Comments',
      description: 'Delete any comment.',
      category: 'Collaboration & Communication'
    },
    { 
      name: 'mention_users', 
      displayName: 'Mention Users',
      description: 'Mention other users in comments/descriptions.',
      category: 'Collaboration & Communication'
    },
    { 
      name: 'upload_files', 
      displayName: 'Upload Files',
      description: 'Upload files to tasks.',
      category: 'Collaboration & Communication'
    },
    { 
      name: 'download_files', 
      displayName: 'Download Files',
      description: 'Download files attached to tasks.',
      category: 'Collaboration & Communication'
    },
    { 
      name: 'delete_files', 
      displayName: 'Delete Files',
      description: 'Delete files attached to tasks.',
      category: 'Collaboration & Communication'
    },

    // Data & Analytics
    { 
      name: 'view_analytics', 
      displayName: 'View Analytics',
      description: 'View organization/team/project analytics dashboards.',
      category: 'Data & Analytics'
    },
    { 
      name: 'view_audit_logs', 
      displayName: 'View Audit Logs',
      description: 'View the audit logs.',
      category: 'Data & Analytics'
    },
    { 
      name: 'view_activity_feed', 
      displayName: 'View Activity Feed',
      description: 'View the human-readable activity timeline.',
      category: 'Data & Analytics'
    },

    // Notifications & Invitations
    { 
      name: 'send_invitations', 
      displayName: 'Send Invitations',
      description: 'Invite new users to the organization.',
      category: 'Notifications & Invitations'
    },
    { 
      name: 'manage_notification_preferences', 
      displayName: 'Manage Notification Preferences',
      description: 'Configure their own notification preferences.',
      category: 'Notifications & Invitations'
    },

    // Search & Administration
    { 
      name: 'perform_global_search', 
      displayName: 'Perform Global Search',
      description: 'Use the global search feature across all data.',
      category: 'Search & Administration'
    },
    { 
      name: 'manage_system_settings', 
      displayName: 'Manage System Settings',
      description: 'Manage system-wide settings (in future).',
      category: 'Search & Administration'
    },
  ]

  for (const permission of permissions) {
    await prisma.permission.upsert({
      where: { name: permission.name },
      update: {
        displayName: permission.displayName,
        description: permission.description,
        category: permission.category,
      },
      create: permission,
    })
  }

  console.log(`✅ Seeded ${permissions.length} permissions successfully`)
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })