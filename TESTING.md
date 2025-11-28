# Testing Checklist

Use this checklist to test your Hotel Maintenance App before and after deployment.

---

## ✅ Pre-Deployment Testing (Local)

### Setup
- [ ] Dependencies installed (`npm install`)
- [ ] Database initialized (`npx prisma db push`)
- [ ] Dev server starts (`npm run dev`)
- [ ] App loads at http://localhost:3000

### Dashboard
- [ ] Statistics show 0 for all categories initially
- [ ] "New Request" button visible and clickable
- [ ] Filter dropdowns work
- [ ] No errors in browser console

### Create Request
- [ ] Click "New Request" opens modal
- [ ] All fields visible and editable
- [ ] Form validation works (try submitting empty)
- [ ] Create button submits successfully
- [ ] Modal closes after submission
- [ ] New request appears in list immediately
- [ ] Statistics update correctly

### Request List
- [ ] New request displays with correct info
- [ ] Category icon shows correctly
- [ ] Priority badge has correct color
- [ ] Status badge shows "PENDING"
- [ ] Room number is prominent
- [ ] Description text is visible
- [ ] Timestamp is formatted correctly

### Request Details
- [ ] Click request opens details modal
- [ ] All information displays correctly
- [ ] Status buttons all visible
- [ ] Assign technician dropdown works
- [ ] Delete button is visible

### Update Status
- [ ] Click "In Progress" button
- [ ] Status badge updates to blue
- [ ] Request list updates immediately
- [ ] Statistics update (pending decreases, in-progress increases)
- [ ] Click "Completed" button
- [ ] Status badge updates to green
- [ ] Resolved date appears
- [ ] Statistics update correctly

### Assign Technician
- [ ] Select technician from dropdown
- [ ] Name saves successfully
- [ ] Assigned name appears in request list
- [ ] Assigned name appears in details modal

### Filter Functionality
- [ ] Create requests with different statuses
- [ ] Filter by status works
- [ ] Filter by priority works
- [ ] Combining filters works
- [ ] "All" option shows everything

### Delete Request
- [ ] Click delete button
- [ ] Confirmation dialog appears
- [ ] Cancel works (request stays)
- [ ] Confirm deletes request
- [ ] Request removed from list
- [ ] Statistics update correctly

### Multiple Requests
- [ ] Create 5+ requests with various:
  - Different room numbers
  - Different categories
  - Different priorities
  - Different statuses
- [ ] All display correctly
- [ ] List scrolls if needed
- [ ] No performance issues

### Edge Cases
- [ ] Very long room number (e.g., "Presidential Suite 12345")
- [ ] Very long description (500+ characters)
- [ ] Special characters in description
- [ ] Empty assigned technician (should show "Unassigned")
- [ ] Rapid clicking doesn't break UI

---

## 🌐 Post-Deployment Testing (Production)

### Initial Deployment
- [ ] App loads at Vercel URL
- [ ] No 404 or 500 errors
- [ ] Dashboard renders correctly
- [ ] All styling loads (check for missing CSS)

### Database Connection
- [ ] Create first request
- [ ] Request saves to database
- [ ] Refresh page - data persists
- [ ] Statistics are accurate

### API Functionality
- [ ] GET requests work (list loads)
- [ ] POST requests work (create succeeds)
- [ ] PATCH requests work (update succeeds)
- [ ] DELETE requests work (delete succeeds)
- [ ] Stats endpoint works

### Repeat Core Tests
- [ ] Create request
- [ ] Update status
- [ ] Assign technician
- [ ] Filter requests
- [ ] Delete request
- [ ] All tests from local testing above

### Performance
- [ ] Page loads in < 2 seconds
- [ ] No lag when creating requests
- [ ] Smooth filtering
- [ ] Quick modal open/close
- [ ] No console errors

### Mobile Testing
- [ ] Open on phone browser
- [ ] Layout is responsive
- [ ] Buttons are tappable
- [ ] Forms work on mobile
- [ ] Modals scroll correctly
- [ ] All features work

### Cross-Browser
- [ ] Chrome/Edge works
- [ ] Firefox works
- [ ] Safari works (if available)

### Data Persistence
- [ ] Create request
- [ ] Close browser
- [ ] Reopen app
- [ ] Request still there
- [ ] Statistics correct

---

## 🐛 Common Issues & Fixes

### Issue: "Environment variable not found"
**Test:** Check server logs
**Fix:** Add DATABASE_URL in Vercel settings

### Issue: Blank page
**Test:** Open browser console
**Fix:** Check for JavaScript errors, verify build succeeded

### Issue: Requests don't save
**Test:** Check network tab for API errors
**Fix:** Verify database connection, check `npx prisma db push` was run

### Issue: Styling broken
**Test:** View page source, check if CSS loads
**Fix:** Rebuild: `npm run build` locally first

### Issue: Slow performance
**Test:** Open DevTools Performance tab
**Fix:** Check database queries, verify Vercel region matches database region

---

## 📊 Test Data Suggestions

Create these sample requests for comprehensive testing:

1. **Urgent Electrical Issue**
   - Room: 101
   - Category: Electrical
   - Priority: Urgent
   - Description: "Power outlet sparking, room evacuated"

2. **High Priority Plumbing**
   - Room: 205
   - Category: Plumbing
   - Priority: High
   - Description: "Shower head broken, water spraying everywhere"

3. **Medium HVAC**
   - Room: 312
   - Category: HVAC
   - Priority: Medium
   - Description: "Air conditioning making loud noise"

4. **Low Furniture**
   - Room: 410
   - Category: Furniture
   - Priority: Low
   - Description: "Desk chair wobbles slightly"

5. **Completed Cleaning**
   - Room: 502
   - Category: Cleaning
   - Priority: Medium
   - Description: "Coffee spill on carpet"
   - Status: Completed

---

## 🎯 Success Criteria

Your app is ready for production when:

✅ All core features work in local environment
✅ All core features work in production
✅ No errors in browser console
✅ No errors in Vercel logs
✅ Data persists after browser refresh
✅ Statistics are accurate
✅ Mobile responsive works
✅ Performance is good (< 2s load)
✅ Multiple requests can be managed
✅ Filters work correctly

---

## 📝 Testing Log Template

Use this to track your testing:

```
Date: _______________
Tester: _______________
Environment: [ ] Local  [ ] Production
Version/Commit: _______________

Feature Tests:
[ ] Dashboard loads
[ ] Create request
[ ] Update status  
[ ] Assign technician
[ ] Filter requests
[ ] Delete request

Issues Found:
1. _______________________________
2. _______________________________
3. _______________________________

Notes:
_________________________________
_________________________________
_________________________________

Status: [ ] Pass  [ ] Fail
```

---

## 🚀 Load Testing (Optional)

For high-traffic scenarios:

1. Create 50+ requests
2. Test filtering performance
3. Test list scrolling
4. Check database query times
5. Monitor Vercel metrics

**Tools to consider:**
- Vercel Analytics
- Lighthouse (Chrome DevTools)
- PageSpeed Insights

---

## ✨ Polish Checks

Before showing to users:

- [ ] Fix any typos
- [ ] Ensure consistent spacing
- [ ] Verify all colors are intentional
- [ ] Check mobile tap targets (48x48px minimum)
- [ ] Test with real room numbers
- [ ] Use realistic descriptions
- [ ] Add your hotel name to title
- [ ] Consider adding logo

---

**Good luck with your testing! 🎉**
