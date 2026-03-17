# ChildRecord API Endpoints Summary

## AUTHENTICATION

### Register User
- **Verb:** POST
- **URL:** `{{baseUrl}}/api/auth/register`
- **Form-data/JSON:**
```json
{
  "fullname": "John Doe",
  "email": "john.doe@example.com",
  "password": "password123",
  "password_confirmation": "password123",
  "nationality": "United States",
  "timezone": "America/New_York"
}
```
- **Success Response (201 Created):**
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "user": {
      "id": 1,
      "fullname": "John Doe",
      "email": "john.doe@example.com",
      "email_verified_at": null,
      "otp_verified": false,
      "trial_consumed": false,
      "subscribed": false,
      "subscription_plan": null,
      "nationality": "United States",
      "timezone": "America/New_York",
      "created_at": "2024-01-15T10:30:00.000000Z",
      "updated_at": "2024-01-15T10:30:00.000000Z"
    },
    "token": "1|abc123def456ghi789jkl012mno345pqr678stu901vwx234yz"
  }
}
```

### Login User
- **Verb:** POST
- **URL:** `{{baseUrl}}/api/auth/login`
- **Form-data/JSON:**
```json
{
  "email": "john.doe@example.com",
  "password": "password123"
}
```
- **Success Response (200 OK):**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {
      "id": 1,
      "fullname": "John Doe",
      "email": "john.doe@example.com",
      "otp_verified": true,
      "trial_consumed": false,
      "subscribed": true,
      "subscription_plan": "premium",
      "subscription_tier": 2,
      "nationality": "United States",
      "timezone": "America/New_York"
    },
    "token": "1|abc123def456ghi789jkl012mno345pqr678stu901vwx234yz"
  }
}
```

### Get User Profile
- **Verb:** GET
- **URL:** `{{baseUrl}}/api/auth/profile`
- **Headers:** Authorization: Bearer {{authToken}}
- **Success Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "fullname": "John Doe",
    "email": "john.doe@example.com",
    "photo": "https://example.com/photos/user1.jpg",
    "nationality": "United States",
    "timezone": "America/New_York",
    "otp_verified": true,
    "trial_consumed": false,
    "subscribed": true,
    "subscription_plan": "premium",
    "subscription_tier": 2,
    "trial_ends_at": null,
    "created_at": "2024-01-15T10:30:00.000000Z",
    "updated_at": "2024-01-15T10:30:00.000000Z"
  }
}
```

### Logout
- **Verb:** POST
- **URL:** `{{baseUrl}}/api/auth/logout`
- **Headers:** Authorization: Bearer {{authToken}}
- **Success Response (200 OK):**
```json
{
  "success": true,
  "message": "Logged out successfully"
}
```

---

## CHILD MANAGEMENT

### Add Child
- **Verb:** POST
- **URL:** `{{baseUrl}}/api/child`
- **Headers:** Authorization: Bearer {{authToken}}
- **Form-data/JSON:**
```json
{
  "name": "Emma Johnson",
  "gender": "girl",
  "birthday": "2 years",
  "weight": "12 KG",
  "height": "85 CM",
  "photo": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQ..."
}
```
- **Success Response (201 Created):**
```json
{
  "success": true,
  "message": "Child added successfully",
  "data": {
    "id": 1,
    "parent_id": 1,
    "name": "Emma Johnson",
    "gender": "girl",
    "birthday": "2 years",
    "weight": "12 KG",
    "height": "85 CM",
    "photo": "children/photos/child1_1642234567.jpg",
    "selected": true,
    "height_percentile": 75,
    "weight_percentile": 68,
    "created_at": "2024-01-15T11:00:00.000000Z",
    "updated_at": "2024-01-15T11:00:00.000000Z"
  }
}
```

### Get All Children
- **Verb:** GET
- **URL:** `{{baseUrl}}/api/child/all`
- **Headers:** Authorization: Bearer {{authToken}}
- **Success Response (200 OK):**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "Emma Johnson",
      "gender": "girl",
      "birthday": "2 years",
      "weight": "12 KG",
      "height": "85 CM",
      "photo": "/assets/images/children/child-1.jpg",
      "selected": true,
      "age": "2 years 3 months",
      "height_percentile": 75,
      "weight_percentile": 68
    },
    {
      "id": 2,
      "name": "Lucas Johnson",
      "gender": "boy",
      "birthday": "6 months",
      "weight": "8 KG",
      "height": "68 CM",
      "photo": "/assets/images/children/child-2.jpg",
      "selected": false,
      "age": "6 months 2 weeks",
      "height_percentile": 82,
      "weight_percentile": 76
    }
  ]
}
```

### Get Selected Child
- **Verb:** GET
- **URL:** `{{baseUrl}}/api/child`
- **Headers:** Authorization: Bearer {{authToken}}
- **Success Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "name": "Emma Johnson",
    "gender": "girl",
    "birthday": "2 years",
    "weight": "12 KG",
    "height": "85 CM",
    "photo": "/assets/images/children/child-1.jpg",
    "selected": true,
    "age": "2 years 3 months",
    "height_percentile": 75,
    "weight_percentile": 68,
    "created_at": "2024-01-15T11:00:00.000000Z",
    "updated_at": "2024-01-15T11:00:00.000000Z"
  }
}
```

### Switch Child
- **Verb:** POST
- **URL:** `{{baseUrl}}/api/child/switch/{{childId}}`
- **Headers:** Authorization: Bearer {{authToken}}
- **Success Response (200 OK):**
```json
{
  "success": true,
  "message": "Child switched successfully",
  "data": {
    "id": 2,
    "name": "Lucas Johnson",
    "gender": "boy",
    "birthday": "6 months",
    "weight": "8 KG",
    "height": "68 CM",
    "photo": "children/photos/child2_1642234568.jpg",
    "selected": true,
    "age": "6 months 2 weeks"
  }
}
```

---

## DASHBOARD

### Get Dashboard Reminders
- **Verb:** GET
- **URL:** `{{baseUrl}}/api/dashboard/reminder`
- **Headers:** Authorization: Bearer {{authToken}}
- **Success Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "upcoming": [
      {
        "id": 1,
        "title": "Vaccination Appointment",
        "description": "6-month vaccination checkup",
        "reminder_date": "2024-01-20",
        "reminder_time": "10:00:00",
        "type": "medical",
        "sent": false,
        "child": {
          "id": 2,
          "name": "Lucas Johnson"
        }
      },
      {
        "id": 2,
        "title": "Pediatrician Visit",
        "description": "Regular checkup",
        "reminder_date": "2024-01-25",
        "reminder_time": "14:30:00",
        "type": "medical",
        "sent": false,
        "child": {
          "id": 1,
          "name": "Emma Johnson"
        }
      }
    ],
    "total": 2
  }
}
```

### Get Today's Reminders
- **Verb:** GET
- **URL:** `{{baseUrl}}/api/dashboard/reminder/today`
- **Headers:** Authorization: Bearer {{authToken}}
- **Success Response (200 OK):**
```json
{
  "success": true,
  "data": [
    {
      "id": 3,
      "title": "Medicine Time",
      "description": "Give vitamin D drops",
      "reminder_date": "2024-01-15",
      "reminder_time": "08:00:00",
      "type": "daily",
      "sent": true,
      "child": {
        "id": 2,
        "name": "Lucas Johnson"
      }
    }
  ]
}
```

### Add Reminder
- **Verb:** POST
- **URL:** `{{baseUrl}}/api/dashboard/reminder`
- **Headers:** Authorization: Bearer {{authToken}}
- **Form-data/JSON:**
```json
{
  "title": "Dental Checkup",
  "description": "Regular dental examination",
  "reminder_date": "2024-02-01",
  "reminder_time": "15:00:00",
  "type": "medical",
  "child_id": 1,
  "repeat_schedule": "monthly"
}
```
- **Success Response (201 Created):**
```json
{
  "success": true,
  "message": "Reminder added successfully",
  "data": {
    "id": 4,
    "parent_id": 1,
    "child_id": 1,
    "title": "Dental Checkup",
    "description": "Regular dental examination",
    "reminder_date": "2024-02-01",
    "reminder_time": "15:00:00",
    "type": "medical",
    "sent": false,
    "repeat_schedule": "monthly",
    "created_at": "2024-01-15T12:00:00.000000Z",
    "updated_at": "2024-01-15T12:00:00.000000Z"
  }
}
```

### Get Dashboard Activities
- **Verb:** GET
- **URL:** `{{baseUrl}}/api/dashboard/activity`
- **Headers:** Authorization: Bearer {{authToken}}
- **Success Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "daily_activities": [
      {
        "id": 1,
        "title": "Story Time",
        "description": "Read a bedtime story together",
        "photo": "activities/photos/activity1.jpg",
        "icon": "book",
        "age_range": "2-3 years",
        "completed": false,
        "views": 15,
        "youtube_link": null,
        "tips_count": 3,
        "articles_count": 2
      },
      {
        "id": 2,
        "title": "Coloring Fun",
        "description": "Color with crayons and paper",
        "photo": "activities/photos/activity2.jpg",
        "icon": "palette",
        "age_range": "2-4 years",
        "completed": true,
        "views": 8,
        "youtube_link": "https://youtube.com/watch?v=example",
        "tips_count": 5,
        "articles_count": 1
      }
    ],
    "completion_rate": 50
  }
}
```

### Mark Activity as Completed
- **Verb:** POST
- **URL:** `{{baseUrl}}/api/dashboard/activity/{{activityId}}/complete/{{completed}}`
- **Headers:** Authorization: Bearer {{authToken}}
- **Success Response (200 OK):**
```json
{
  "success": true,
  "message": "Activity marked as completed",
  "data": {
    "activity_id": 1,
    "completed": true,
    "completion_date": "2024-01-15T12:30:00.000000Z"
  }
}
```

---

## GROWTH CHART

### Get Weight Chart
- **Verb:** GET
- **URL:** `{{baseUrl}}/api/chart/weight`
- **Headers:** Authorization: Bearer {{authToken}}
- **Success Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "child": {
      "id": 1,
      "name": "Emma Johnson",
      "age": "2 years 3 months"
    },
    "weight_chart": {
      "current_weight": "12 KG",
      "weight_percentile": 68,
      "weight_logs": [
        {
          "id": 1,
          "weight": "10.5 KG",
          "logged_date": "2023-10-15",
          "age_months": 24
        },
        {
          "id": 2,
          "weight": "11.2 KG",
          "logged_date": "2023-11-15",
          "age_months": 25
        },
        {
          "id": 3,
          "weight": "12 KG",
          "logged_date": "2024-01-15",
          "age_months": 27
        }
      ],
      "percentile_curve": [
        {"month": 24, "weight": 10.5, "percentile": 65},
        {"month": 25, "weight": 11.2, "percentile": 67},
        {"month": 26, "weight": 11.6, "percentile": 68},
        {"month": 27, "weight": 12, "percentile": 68}
      ]
    }
  }
}
```

### Get Height Chart
- **Verb:** GET
- **URL:** `{{baseUrl}}/api/chart/height`
- **Headers:** Authorization: Bearer {{authToken}}
- **Success Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "child": {
      "id": 1,
      "name": "Emma Johnson",
      "age": "2 years 3 months"
    },
    "height_chart": {
      "current_height": "85 CM",
      "height_percentile": 75,
      "height_logs": [
        {
          "id": 1,
          "height": "82 CM",
          "logged_date": "2023-10-15",
          "age_months": 24
        },
        {
          "id": 2,
          "height": "83.5 CM",
          "logged_date": "2023-11-15",
          "age_months": 25
        },
        {
          "id": 3,
          "height": "85 CM",
          "logged_date": "2024-01-15",
          "age_months": 27
        }
      ],
      "percentile_curve": [
        {"month": 24, "height": 82, "percentile": 73},
        {"month": 25, "height": 83.5, "percentile": 74},
        {"month": 26, "height": 84.2, "percentile": 75},
        {"month": 27, "height": 85, "percentile": 75}
      ]
    }
  }
}
```

### Log Weight/Height
- **Verb:** POST
- **URL:** `{{baseUrl}}/api/chart/log`
- **Headers:** Authorization: Bearer {{authToken}}
- **Form-data/JSON:**
```json
{
  "weight": "12.5 KG",
  "height": "86 CM",
  "logged_date": "2024-01-15"
}
```
- **Success Response (201 Created):**
```json
{
  "success": true,
  "message": "Weight and height logged successfully",
  "data": {
    "id": 4,
    "child_id": 1,
    "weight": "12.5 KG",
    "height": "86 CM",
    "age": "27 months",
    "logged_date": "2024-01-15",
    "created_at": "2024-01-15T13:00:00.000000Z",
    "updated_at": "2024-01-15T13:00:00.000000Z"
  }
}
```

---

## MILESTONES

### Get Milestone Categories
- **Verb:** GET
- **URL:** `{{baseUrl}}/api/milestone/category`
- **Headers:** Authorization: Bearer {{authToken}}
- **Success Response (200 OK):**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "Physical Development",
      "description": "Gross and fine motor skills development",
      "icon": "running",
      "color": "#FF6B6B",
      "milestones_count": 15,
      "progress": 73
    },
    {
      "id": 2,
      "name": "Cognitive Development",
      "description": "Thinking, learning, and problem-solving skills",
      "icon": "brain",
      "color": "#4ECDC4",
      "milestones_count": 12,
      "progress": 58
    },
    {
      "id": 3,
      "name": "Language Development",
      "description": "Communication and language skills",
      "icon": "chat",
      "color": "#45B7D1",
      "milestones_count": 18,
      "progress": 67
    },
    {
      "id": 4,
      "name": "Social-Emotional Development",
      "description": "Understanding and managing emotions",
      "icon": "heart",
      "color": "#96CEB4",
      "milestones_count": 10,
      "progress": 80
    }
  ]
}
```

### Get Category Milestones
- **Verb:** GET
- **URL:** `{{baseUrl}}/api/milestone/category/{{categoryId}}/milestone`
- **Headers:** Authorization: Bearer {{authToken}}
- **Success Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "category": {
      "id": 1,
      "name": "Physical Development",
      "icon": "running",
      "color": "#FF6B6B"
    },
    "milestones": [
      {
        "id": 1,
        "title": "Walks independently",
        "description": "Child can walk without support",
        "age_range": "12-18 months",
        "completed": true,
        "completion_date": "2022-08-15",
        "activities_count": 5,
        "tips_count": 8,
        "articles_count": 3
      },
      {
        "id": 2,
        "title": "Runs steadily",
        "description": "Child can run with good balance",
        "age_range": "18-24 months",
        "completed": true,
        "completion_date": "2023-02-20",
        "activities_count": 4,
        "tips_count": 6,
        "articles_count": 2
      },
      {
        "id": 3,
        "title": "Jumps with both feet",
        "description": "Child can jump off the ground with both feet",
        "age_range": "24-30 months",
        "completed": false,
        "completion_date": null,
        "activities_count": 6,
        "tips_count": 7,
        "articles_count": 4
      }
    ]
  }
}
```

### Get Milestone Details
- **Verb:** GET
- **URL:** `{{baseUrl}}/api/milestone/{{milestoneId}}`
- **Headers:** Authorization: Bearer {{authToken}}
- **Success Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "id": 3,
    "title": "Jumps with both feet",
    "description": "Child can jump off the ground with both feet",
    "age_range": "24-30 months",
    "from": 24,
    "to": 30,
    "completed": false,
    "completion_date": null,
    "category": {
      "id": 1,
      "name": "Physical Development",
      "icon": "running",
      "color": "#FF6B6B"
    },
    "activities": [
      {
        "id": 7,
        "title": "Jumping Games",
        "description": "Fun jumping activities for toddlers",
        "photo": "activities/photos/jumping.jpg",
        "icon": "jump",
        "views": 23,
        "tips_count": 4,
        "articles_count": 2
      }
    ],
    "tips": [
      {
        "id": 15,
        "title": "Make jumping fun",
        "content": "Use songs and games to encourage jumping...",
        "views": 45
      }
    ],
    "articles": [
      {
        "id": 8,
        "title": "When do toddlers start jumping?",
        "content": "Most toddlers start jumping between 24-30 months...",
        "photo": "articles/photos/jumping-development.jpg",
        "views": 67
      }
    ]
  }
}
```

### Mark Milestone as Completed
- **Verb:** POST
- **URL:** `{{baseUrl}}/api/milestone/{{milestoneId}}/completed/{{completed}}`
- **Headers:** Authorization: Bearer {{authToken}}
- **Success Response (200 OK):**
```json
{
  "success": true,
  "message": "Milestone marked as completed",
  "data": {
    "milestone_id": 3,
    "completed": true,
    "completion_date": "2024-01-15T14:00:00.000000Z",
    "category_progress": 80
  }
}
```

---

## PROFILE MANAGEMENT

### Get Profile Info
- **Verb:** GET
- **URL:** `{{baseUrl}}/api/profile`
- **Headers:** Authorization: Bearer {{authToken}}
- **Success Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": 1,
      "fullname": "John Doe",
      "email": "john.doe@example.com",
      "photo": "users/photos/user1.jpg",
      "nationality": "United States",
      "timezone": "America/New_York",
      "otp_verified": true,
      "trial_consumed": false,
      "subscribed": true,
      "subscription_plan": "premium",
      "subscription_tier": 2,
      "trial_ends_at": null,
      "created_at": "2024-01-15T10:30:00.000000Z"
    },
    "children": [
      {
        "id": 1,
        "name": "Emma Johnson",
        "gender": "girl",
        "age": "2 years 3 months",
        "photo": "children/photos/child1.jpg",
        "selected": true
      },
      {
        "id": 2,
        "name": "Lucas Johnson",
        "gender": "boy",
        "age": "6 months 2 weeks",
        "photo": "children/photos/child2.jpg",
        "selected": false
      }
    ],
    "subscription": {
      "plan": "premium",
      "tier": 2,
      "status": "active",
      "trial_consumed": false,
      "next_billing_date": "2024-02-15"
    }
  }
}
```

### Update Profile Info
- **Verb:** POST
- **URL:** `{{baseUrl}}/api/profile/update`
- **Headers:** Authorization: Bearer {{authToken}}
- **Form-data/JSON:**
```json
{
  "fullname": "John Smith Doe",
  "timezone": "America/Los_Angeles",
  "nationality": "Canada"
}
```
- **Success Response (200 OK):**
```json
{
  "success": true,
  "message": "Profile updated successfully",
  "data": {
    "id": 1,
    "fullname": "John Smith Doe",
    "email": "john.doe@example.com",
    "timezone": "America/Los_Angeles",
    "nationality": "Canada",
    "updated_at": "2024-01-15T15:00:00.000000Z"
  }
}
```

### Get Achieved Milestones
- **Verb:** GET
- **URL:** `{{baseUrl}}/api/profile/milestone`
- **Headers:** Authorization: Bearer {{authToken}}
- **Success Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "child": {
      "id": 1,
      "name": "Emma Johnson",
      "age": "2 years 3 months"
    },
    "achieved_milestones": [
      {
        "id": 1,
        "title": "Walks independently",
        "category": "Physical Development",
        "completion_date": "2022-08-15",
        "age_achieved": "14 months",
        "photo": "milestones/photos/walking.jpg"
      },
      {
        "id": 2,
        "title": "Says 10+ words",
        "category": "Language Development",
        "completion_date": "2022-12-20",
        "age_achieved": "18 months",
        "photo": "milestones/photos/talking.jpg"
      },
      {
        "id": 4,
        "title": "Feeds self with spoon",
        "category": "Physical Development",
        "completion_date": "2023-03-10",
        "age_achieved": "20 months",
        "photo": null
      }
    ],
    "total_achieved": 15,
    "completion_rate": 75
  }
}
```

---

## SUBSCRIPTION

### Start Trial Subscription
- **Verb:** POST
- **URL:** `{{baseUrl}}/api/subscribe/trial`
- **Headers:** Authorization: Bearer {{authToken}}
- **Success Response (200 OK):**
```json
{
  "success": true,
  "message": "Trial subscription started successfully",
  "data": {
    "subscription": {
      "plan": "trial",
      "tier": 1,
      "trial_ends_at": "2024-01-29T23:59:59.000000Z",
      "trial_consumed": true,
      "subscribed": true
    },
    "trial_days_remaining": 14
  }
}
```

### Subscribe to Basic Plan
- **Verb:** POST
- **URL:** `{{baseUrl}}/api/subscribe/basic`
- **Headers:** Authorization: Bearer {{authToken}}
- **Success Response (200 OK):**
```json
{
  "success": true,
  "message": "Redirecting to payment gateway",
  "data": {
    "checkout_url": "https://checkout.stripe.com/pay/cs_test_a1B2c3D4e5F6g7H8i9J0k1L2m3N4o5P6q7R8s9T0u1V2w3X4y5Z6",
    "session_id": "cs_test_a1B2c3D4e5F6g7H8i9J0k1L2m3N4o5P6q7R8s9T0u1V2w3X4y5Z6"
  }
}
```

### Get Billing History
- **Verb:** GET
- **URL:** `{{baseUrl}}/api/subscribe/history`
- **Headers:** Authorization: Bearer {{authToken}}
- **Success Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "current_subscription": {
      "plan": "premium",
      "tier": 2,
      "status": "active",
      "next_billing_date": "2024-02-15",
      "amount": "$19.99"
    },
    "billing_history": [
      {
        "id": "inv_1ABC123DEF456",
        "date": "2024-01-15",
        "amount": "$19.99",
        "plan": "premium",
        "status": "paid",
        "payment_method": "Visa ending in 4242"
      },
      {
        "id": "inv_2XYZ789ABC012",
        "date": "2023-12-15",
        "amount": "$19.99",
        "plan": "premium",
        "status": "paid",
        "payment_method": "Visa ending in 4242"
      }
    ]
  }
}
```

---

## POSTMAN VARIABLES
```
baseUrl = https://api.childrecord.com
authToken = 1|abc123def456ghi789jkl012mno345pqr678stu901vwx234yz
childId = 1
activityId = 1
categoryId = 1
milestoneId = 1
```